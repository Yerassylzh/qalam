"use client";

import ArrowGreenButton from "@/features/authentication/components/form/ArrowGreenButton";
import Input from "@/features/authentication/components/form/Input";
import LabelledInput from "@/features/authentication/components/form/LabelledInput";
import PasswordInput from "@/features/authentication/components/form/PasswordInput";
import { login } from "@/features/authentication/lib/users/loginAdmin";
import React, { useActionState, useCallback } from "react";

export default function Page() {
  return (
    <div className="w-full flex-1 flex flex-col gap-[27px] justify-center items-center">
      <p className="text-[24px] font-semibold">Войдите в аккаунт</p>
      <LoginForm />
    </div>
  );
}

type LoginState = {
  formData: { [k: string]: FormDataEntryValue };
  errors: {
    email?: string[];
    password?: string[];
  };
};

function LoginForm() {
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
            placeholder="Введите пароль"
            name="password"
            error={getError("password")}
            defaultValue={loginData?.formData?.["password"]?.toString()}
            required
          />
        }
      />
      <ArrowGreenButton
        className="w-full"
        text="Продолжить"
        isLoading={isPending}
      />
    </form>
  );
}
