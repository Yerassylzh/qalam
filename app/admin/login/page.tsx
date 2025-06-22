import { LoginForm } from "@/app/login/page";
import React from "react";

export default function Page() {
  return (
    <div className="w-full flex-1 flex flex-col gap-[27px] justify-center items-center">
      <p className="text-[24px] font-semibold">Войдите в аккаунт</p>
      <LoginForm />
    </div>
  );
}
