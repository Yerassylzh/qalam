"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  deleteSession,
} from "@/features/authentication/lib/users/session";
import { redirect } from "next/navigation";
import { hashPassword } from "@/utils/passwords";
import { User } from "@/types/user";


const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

type Errors = {
  email: string[];
  password: string[];
};

export async function login(prevState: object, formData: FormData, isAdmin: boolean = false, redirectTo: string = "/") {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      formData: Object.fromEntries(formData),
      errors: result.error.flatten().fieldErrors as Errors,
    };
  }

  const { email, password } = result.data;
  const passwordHash = await hashPassword(password);

  const user: User = (await prisma.user.findUnique({
    where: { email: email, isAdmin: isAdmin ? isAdmin : false },
  })) as User;

  if (!user || user.password !== passwordHash) {
    return {
      formData: Object.fromEntries(formData),
      errors: {
        email: [],
        password: ["Неправильная почта или пароль"],
      },
    };
  }

  const days30 = 30 * 24 * 60 * 60 * 1000;
  await createSession({ id: user.id, name: user.name, surname: user.surname, email: user.email, isAdmin: user.isAdmin }, days30);

  redirect(redirectTo);
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
