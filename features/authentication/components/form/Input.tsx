import React, { RefObject } from "react";

interface InputProps {
  error?: string | null;
  className: string;
  ref: RefObject<HTMLInputElement> | null;
  type?: "text" | "password";
}

export default function Input({ error, className = "", ref }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`
            w-full text-[var(--color-text)] outline-none px-[12px] py-[6px] border-[1px] rounded-[7px] text-[13px] placeholder:text-gray-500 border-gray-300
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
      />
      {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
    </div>
  );
}
