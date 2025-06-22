import { SignupProvider } from "@/features/authentication/context/SignupContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SignupProvider>{children}</SignupProvider>;
}
