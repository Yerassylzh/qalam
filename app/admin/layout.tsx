import NavbarAdmin from "@/features/authentication/components/NavbarAdmin";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <NavbarAdmin />
      {children}
    </div>
  );
}
