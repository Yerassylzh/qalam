"use client";

import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useBlindModeContext } from "../context/BlindModeContext";
import Link from "next/link";
import { logout } from "@/features/authentication/lib/users/login";

export default function Navbar() {
  const { isBlindMode, setIsBlindMode } = useBlindModeContext();

  return (
    <div className="w-full px-[20px] py-[10px] flex items-center justify-between">
      <p className="font-bold text-[16px]">Qalam.ai</p>
      <div className="flex gap-[20px]">
        <Link href="/">Главная</Link>
        <button onClick={logout}>Выйти</button>
      </div>
      <button className="w-[40px] h-[40px] rounded-[50%] bg-blue-500">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => setIsBlindMode((prev: boolean) => !prev)}
        >
          {isBlindMode ? <Eye /> : <EyeOff />}
        </div>
      </button>
    </div>
  );
}
