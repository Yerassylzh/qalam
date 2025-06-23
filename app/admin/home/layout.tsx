import { AuthProvider } from "@/context/AuthContext";
import { DeviceTypeProvider } from "@/context/DeviceTypeContext";
import NavbarAdmin from "@/features/admin/components/NavbarAdmin";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DeviceTypeProvider>
        <NavbarAdmin />
        {children}
      </DeviceTypeProvider>
    </AuthProvider>
  );
}
