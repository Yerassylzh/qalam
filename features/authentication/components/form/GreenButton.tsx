"use client";

import React from "react";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`px-[20px] cursor-pointer py-[12px] rounded-[20px] bg-green-400 text-white hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-[16px]  ${className}`}
    />
  );
};

export default PrimaryButton;
