"use client";

import GenerationInput from "@/features/admin/components/GenerationInput";
import GenerationParameters from "@/features/admin/components/GenerationParameters";
import { GenerationProvider } from "@/features/admin/context/GenerationContext";
import React from "react";

export default function Wrapper() {
  return (
    <GenerationProvider>
      <Page />
    </GenerationProvider>
  );
}

export function Page() {
  return (
    <div
      className={`w-full flex-1 flex flex-col items-center justify-center gap-[60px]`}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-bold md:text-[70px] text-[48px]">Сгенерировать</p>
        <p className="text-bold md:text-[32px] text-[20px]">
          Что бы вы хотели создать сегодня?
        </p>
      </div>
      <div className="flex flex-col gap-2 p-4 md:w-[750px] w-full">
        <GenerationParameters />
        <GenerationInput />
      </div>
    </div>
  );
}
