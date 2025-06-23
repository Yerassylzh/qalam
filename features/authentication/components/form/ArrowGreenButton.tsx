"use client";

import React from "react";
import GreenButton from "./GreenButton";
import Image from "next/image";
import SpinnerSvg from "./SpinnerSvg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
}

export default function ArrowGreenButton({
  isLoading,
  text,
  className,
  ...props
}: ButtonProps) {
  return (
    <GreenButton
      className={`flex items-center justify-center gap-[5px] ${
        className || ""
      }`}
      {...props}
    >
      {!isLoading ? (
        <>
          <p className="text-[16px] text-white">{text}</p>
          <Image src="/rightArrow.svg" alt=">" width={13} height={13} />
        </>
      ) : (
        <SpinnerSvg />
      )}
    </GreenButton>
  );
}
