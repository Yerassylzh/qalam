"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`
            ${"w-full text-[var(--color-text)] outline-none px-[12px] border-gray-300 py-[6px] border-[1px] rounded-[7px] text-[13px] placeholder:text-gray-500"}
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
