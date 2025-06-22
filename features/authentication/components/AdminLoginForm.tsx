"use client";

import { useActionState, useCallback } from "react";
import LabelledInput from "./form/LabelledInput";
import Input from "./form/Input";
import PasswordInput from "./form/PasswordInput";
import ArrowGreenButton from "./form/ArrowGreenButton";
import Link from "next/link";
import { login } from "../lib/users/loginAdmin";

type LoginState = {
  formData: { [k: string]: FormDataEntryValue };
  errors: {
    email?: string[];
    password?: string[];
  };
};

export default function SignupForm() {
  const [loginData, loginAction, isPending] = useActionState(
    login,
    {} as LoginState
  );

  const getError = useCallback(
    (field: "email" | "password"): string | null => {
      if (
        loginData?.errors &&
        loginData.errors[field] &&
        loginData.errors[field].length > 0
      ) {
        return loginData.errors[field][0] as unknown as string;
      }
      return null;
    },
    [loginData]
  );

  return (
    <form
      className="w-[350px] flex flex-col items-center justify-between gap-[27px]"
      action={loginAction}
    >
      <LabelledInput
        label="Почта"
        inputWidget={
          <Input
            placeholder="Введите вашу почту"
            name="email"
            error={getError("email")}
            defaultValue={loginData?.formData?.["email"]?.toString()}
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
            defaultValue={loginData?.formData?.["password"]?.toString()}
            required
          />
        }
      />
      <div className="flex flex-col justify-center gap-[12px] items-center">
        <ArrowGreenButton
          className="w-full"
          text="Продолжить"
          isLoading={isPending}
        />
        <div className="flex gap-[5px]">
          <p className="text-[15px] text-gray-700">Еще нет аккаунта?</p>
          <Link href="/admin/login" className="text-green-600 text-[15px]">
            Создать аккаунт
          </Link>
        </div>
      </div>
    </form>
  );
}