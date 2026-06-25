"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signUp } from "@/lib/actions/auth";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): string | null {
  if (password.length < 8) return "Must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Must include an uppercase letter.";
  if (!/[0-9]/.test(password)) return "Must include a number.";
  if (!/[^A-Za-z0-9]/.test(password))
    return "Must include a special character (e.g. !@#$%).";
  return null;
}

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error as user types
    if (name === "email" || name === "password") {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const errors: { email?: string; password?: string } = {};
    if (!validateEmail(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      errors.password = passwordError;
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(form);

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created, but sign-in failed. Please try logging in.");
        router.push("/login");
        return;
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const passwordStrength = form.password ? getStrength(form.password) : null;

  return (
    <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="font-display font-bold text-3xl tracking-tight text-ink mb-2">
        Create Account
      </h1>
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-8">
        Join Anytime
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          error={fieldErrors.email}
        />
        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            error={fieldErrors.password}
          />
          {/* Password strength bar — shows as user types */}
          {passwordStrength !== null && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i < passwordStrength.score
                        ? passwordStrength.color
                        : "bg-line"
                    }`}
                  />
                ))}
              </div>
              <p className={`font-mono text-xs ${passwordStrength.textColor}`}>
                {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="font-mono text-xs uppercase tracking-widest text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-ink text-paper font-mono text-xs uppercase tracking-widest py-4 hover:bg-cognac transition-colors disabled:bg-line disabled:text-stone-soft"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="font-mono text-xs text-stone-soft mt-6 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-ink underline hover:text-cognac transition-colors"
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}

// Scores password 0-4 based on rules passed
function getStrength(password: string): {
  score: number;
  label: string;
  color: string;
  textColor: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return {
      score: 1,
      label: "Weak",
      color: "bg-red-400",
      textColor: "text-red-500",
    };
  if (score === 2)
    return {
      score: 2,
      label: "Fair",
      color: "bg-amber-400",
      textColor: "text-amber-500",
    };
  if (score === 3)
    return {
      score: 3,
      label: "Good",
      color: "bg-yellow-400",
      textColor: "text-yellow-600",
    };
  return {
    score: 4,
    label: "Strong",
    color: "bg-green-500",
    textColor: "text-green-600",
  };
}

function Input({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`w-full border bg-paper px-3 py-3 text-sm focus:outline-none focus:border-cognac transition-colors ${
          error ? "border-red-400" : "border-line"
        }`}
      />
      {error && <p className="font-mono text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
