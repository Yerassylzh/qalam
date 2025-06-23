"use client";

import { chooseIf } from "@/utils/utils";
import { useSignupContext } from "../../context/SignupContext";
import GreenButton from "../form/GreenButton";
import Image from "next/image";
import RadioInput from "@/components/RadioInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function ContinueButton() {
  const router = useRouter();
  const { userRole, setSignupStage } = useSignupContext();

  return (
    <GreenButton
      onClick={() => {
        if (userRole === "user") {
          setSignupStage("interests");
        } else if (userRole === "admin") {
          router.push("/admin/signup");
        } else {
          toast.error("Выберите свою роль");
        }
      }}
      className="flex gap-[5px]"
    >
      <p className="text-[16px] text-white">Присоеденитьрся</p>
      <Image src="/rightArrow.svg" alt=">" width={13} height={13} />
    </GreenButton>
  );
}

export function AdminUserRoleChoice() {
  const { userRole, setUserRole } = useSignupContext();

  return (
    <div
      className={`flex flex-col md:w-[250px] p-[14px] gap-[10px] rounded-[8px] flex-1 cursor-pointer ${chooseIf(
        userRole === "admin",
        "bg-green-50 border-gray-800 border-[2px]",
        "border border-gray-700"
      )}`}
      onClick={() => {
        if (userRole === "admin") {
          setUserRole(null);
        } else {
          setUserRole("admin");
        }
      }}
    >
      <div className="w-full flex justify-between items-center">
        <Image
          src="/userAdmin.svg"
          alt="A"
          width={32}
          height={32}
          unoptimized
        />
        <RadioInput isChecked={userRole === "admin"} name="userRole" />
      </div>
      <p className="text-[16px]">
        Я редактор, который генерирует и публикует статьи
      </p>
    </div>
  );
}

export function RegularUserRoleChoice() {
  const { userRole, setUserRole } = useSignupContext();

  return (
    <div
      className={`flex flex-col md:w-[250px] p-[14px] gap-[10px] rounded-[8px] flex-1 cursor-pointer ${chooseIf(
        userRole === "user",
        "bg-green-50 border-gray-800 border-[2px]",
        "border border-gray-700"
      )}`}
      onClick={() => {
        if (userRole === "user") {
          setUserRole(null);
        } else {
          setUserRole("user");
        }
      }}
    >
      <div className="w-full flex justify-between items-center">
        <Image
          src="/regularUser.svg"
          alt="A"
          width={32}
          height={32}
          unoptimized
        />
        <RadioInput isChecked={userRole === "user"} name="userRole" />
      </div>
      <p className="text-[16px]">
        Я обычный пользователь, интересующийся новостями.
      </p>
    </div>
  );
}
