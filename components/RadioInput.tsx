"use client";

import React from "react";

interface Props {
  className?: string;
  onChange?: (isChecked: boolean) => void;
  isChecked?: boolean;
  name?: string;
}

const RadioInput = ({ className = "", onChange, isChecked, name }: Props) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        className="peer sr-only"
        onChange={(e) => onChange?.(e.target.checked)}
        checked={isChecked}
      />
      <div
        className={`
          w-6 h-6 rounded-full border border-gray-700
          peer-checked:border-green-400 transition-colors
          relative
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 
          before:w-3 before:h-3 before:rounded-full before:bg-green-400
          before:transform before:-translate-x-1/2 before:-translate-y-1/2
          before:opacity-0 before:transition-opacity
          peer-checked:before:opacity-100
        `}
      />
    </label>
  );
};

export default RadioInput;
