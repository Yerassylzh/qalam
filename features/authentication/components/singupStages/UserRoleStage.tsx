"use client";

import Link from "next/link";
import {
  AdminUserRoleChoice,
  ContinueButton,
  RegularUserRoleChoice,
} from "./UserRoleStage.components";

export default function UserRoleStage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center gap-[27px]">
      <p className="text-[24px]">Сначала определим вашу роль</p>
      <div className="flex md:flex-row flex-col gap-[24px] p-[10px]">
        <RegularUserRoleChoice />
        <AdminUserRoleChoice />
      </div>
      <div className="flex flex-col gap-[12px] items-center justify-center">
        <ContinueButton />
        <div className="flex gap-[5px]">
          <p className="text-[15px] text-gray-700">
            Уже есть аккаунт читателя?
          </p>
          <Link href="/login" className="text-green-600 text-[15px]">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
