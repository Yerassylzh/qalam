import { AuthProvider } from "@/context/AuthContext";
import { BlindModeProvider } from "@/features/home/context/BlindModeContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BlindModeProvider>{children}</BlindModeProvider>
    </AuthProvider>
  );
}
