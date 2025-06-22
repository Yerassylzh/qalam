import React from "react";
import { SignupForm } from "./UserInfoStage.components";

export default function UserInfoStage() {
  return (
    <div className="w-full min-h-[max(100dvh,100vh)] flex flex-col justify-center items-center gap-[27px]">
      <p className="text-[24px] font-semibold">Создайте аккаунт</p>
      <SignupForm />
    </div>
  );
}
