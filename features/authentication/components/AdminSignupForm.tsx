"use client";

import { useActionState, useCallback } from "react";
import { signup } from "../lib/users/signupAdmin";
import LabelledInput from "./form/LabelledInput";
import Input from "./form/Input";
import PasswordInput from "./form/PasswordInput";
import ArrowGreenButton from "./form/ArrowGreenButton";
import Link from "next/link";

type SignupState = {
  formData: { [k: string]: FormDataEntryValue };
  errors: {
    name?: string[];
    surname?: string[];
    email?: string[];
    password?: string[];
    secretKey?: string[];
  };
};

export default function SignupForm() {
  const [signupData, signupAction, isPending] = useActionState(
    signup,
    {} as SignupState
  );

  const getError = useCallback(
    (field: "name" | "surname" | "email" | "password" | "secretKey"): string | null => {
      if (
        signupData?.errors &&
        signupData.errors[field] &&
        signupData.errors[field].length > 0
      ) {
        return signupData.errors[field][0] as unknown as string;
      }
      return null;
    },
    [signupData]
  );

  return (
    <form
      className="w-[350px] flex flex-col items-center justify-between gap-[27px]"
      action={signupAction}
    >
      <LabelledInput
        label="Имя"
        inputWidget={
          <Input
            placeholder="Введите ваше имя"
            name="name"
            error={getError("name")}
            defaultValue={signupData?.formData?.["name"]?.toString()}
            required
          />
        }
      />
      <LabelledInput
        label="Фамилия"
        inputWidget={
          <Input
            placeholder="Введите вашу фамилию"
            name="surname"
            error={getError("surname")}
            defaultValue={signupData?.formData?.["surname"]?.toString()}
            required
          />
        }
      />
      <LabelledInput
        label="Почта"
        inputWidget={
          <Input
            placeholder="Введите вашу почту"
            name="email"
            error={getError("email")}
            defaultValue={signupData?.formData?.["email"]?.toString()}
            required
          />
        }
      />
      <LabelledInput
        label="Секретный ключ"
        inputWidget={
          <PasswordInput
            placeholder="Введите секретный ключ"
            name="secretKey"
            error={getError("secretKey")}
            defaultValue={signupData?.formData?.["secretKey"]?.toString()}
            required
          />
        }
      />
      <LabelledInput
        label="Пароль"
        inputWidget={
          <PasswordInput
            placeholder="Придумайте пароль"
            name="password"
            error={getError("password")}
            defaultValue={signupData?.formData?.["password"]?.toString()}
            required
          />
        }
      />
      <div className="flex flex-col justify-center gap-[12px] items-center">
        <ArrowGreenButton
          className="w-full"
          text="Создать аккаунт"
          isLoading={isPending}
        />
        <div className="flex gap-[5px]">
          <p className="text-[15px] text-gray-700">Уже есть аккаунт?</p>
          <Link href="/admin/login" className="text-green-600 text-[15px]">
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
}