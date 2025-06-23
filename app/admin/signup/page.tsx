import SignupForm from "@/features/authentication/components/AdminSignupForm";
import React from "react";

export default function Page() {
  return (
    <div className="w-full flex-1 flex flex-col gap-[27px] justify-center items-center">
      <p className="text-[24px] font-semibold">Создайте аккаунт админа</p>
      <SignupForm />
    </div>
  );
}
