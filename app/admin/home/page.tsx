"use client";

import { GenerationProvider } from "@/features/admin/context/GenerationContext";
import React from "react";
import { Main } from "./page.components";

export default function Page() {
  return (
    <GenerationProvider>
      <Main />
    </GenerationProvider>
  );
}
