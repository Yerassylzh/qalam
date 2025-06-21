"use client";

import React, { useState, RefObject } from "react";
import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  error?: string | null;
  ref: RefObject<HTMLInputElement> | null;
  className?: string;
}

export default function PasswordInput({
  error,
  ref,
  className,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={`pr-10 ${className ?? ""}`}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={() => setVisible((prev) => !prev)}
          tabIndex={-1}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
    </div>
  );
}
