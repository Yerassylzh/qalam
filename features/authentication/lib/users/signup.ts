"use server";

import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import i18next from "i18next";
import ru from "zod-i18n-map/locales/ru/zod.json";
import { prisma } from "@/lib/prisma";
import { createSession } from "./session";
import { hashPassword } from "@/utils/passwords";
import { User } from "@/types/user";

i18next.init({
  lng: "ru",
  resources: {
    ru: { zod: ru },
  },
});

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
});

export async function signup(prevState: object, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      formData: Object.fromEntries(formData),
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, surname, email, password } = result.data;
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
        email: ["User with this handle already exists"],
      },
    };
  }

  const user = (await prisma.user.create({
    data: {
      name: name,
      surname: surname,
      email: email,
      password: passwordHash,
      isAdmin: false,
    },
  })) as User;

  const duration = 30 * 24 * 60 * 60 * 1000;
  await createSession(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      isAdmin: false,
    },
    duration
  );

  return {
    formData: Object.fromEntries(formData),
    errors: {
      name: [],
      surname: [],
      password: [],
      email: [],
    },
    success: true,
    userId: user.id,
  };
}
