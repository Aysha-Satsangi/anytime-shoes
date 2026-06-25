"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error as user types
    if (name === "email") {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    }
  }

  function validate() {
    const errors: { email?: string } = {};
    if (!validateEmail(form.email)) {
      errors.email = "Please enter a valid email address.";
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

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="font-display font-bold text-3xl tracking-tight text-ink mb-2">
        Sign In
      </h1>
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-8">
        Welcome back
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          error={fieldErrors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

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
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="font-mono text-xs text-stone-soft mt-6 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-ink underline hover:text-cognac transition-colors">
          Create one
        </Link>
      </p>
    </main>
  );
}

function Input({
  label,
  error,
  ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
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
      {error && (
        <p className="font-mono text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}