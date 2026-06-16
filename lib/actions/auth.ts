"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing && existing.password) {
    throw new Error("An account with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (existing) {
    // This email was used for a guest checkout before - attach a password now
    await prisma.user.update({
      where: { email },
      data: { name, password: hashedPassword },
    });
  } else {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }
}