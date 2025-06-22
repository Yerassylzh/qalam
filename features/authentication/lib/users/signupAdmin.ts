"use server";

import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import i18next from "i18next";
import ru from "zod-i18n-map/locales/ru/zod.json";
import { prisma } from "@/lib/prisma";
import { createSession } from "./session";
import { hashPassword } from "@/utils/passwords";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

i18next.init({
  lng: "ru",
  resources: {
    ru: { zod: ru },
  },
});

const adminSecretKey = process.env.ADMIN_SECRET as string;

z.setErrorMap(zodI18nMap);

const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Имя слишком короткое" })
    .regex(/^\S+$/, { message: "Должно быть одно слово без пробелов" })
    .trim(),
  surname: z
    .string()
    .min(3, { message: "Фамилия слишком короткая" })
    .regex(/^\S+$/, { message: "Должно быть одно слово без пробелов" })
    .trim(),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать минимум 8 символов" })
    .trim(),
  secretKey: z.string().trim()
});

export async function signup(prevState: object, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      formData: Object.fromEntries(formData),
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, surname, email, password, secretKey } = result.data;

  if (secretKey !== adminSecretKey) {
    return {
      formData: Object.fromEntries(formData),
      errors: {
        name: [],
        surname: [],
        email: [],
        password: [],
        secretKey: ["Невалидный секретный ключ"]
      }
    }
  }

  const passwordHash = await hashPassword(password);
  const existingUser: User = (await prisma.user.findUnique({
    where: { email: email },
  })) as User;

  if (existingUser) {
    return {
      formData: Object.fromEntries(formData),
      errors: {
        name: [],
        surname: [],
        password: [],
        email: ["Такой пользователь уже существует"],
      },
    };
  }

  const user = (await prisma.user.create({
    data: {
      name: name,
      surname: surname,
      email: email,
      password: passwordHash,
      isAdmin: true,
    },
    select: {
      id: true
    }
  })) as User;

  const duration = 30 * 24 * 60 * 60 * 1000;
  await createSession(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      isAdmin: true,
    },
    duration
  );

  redirect("/admin");
}
