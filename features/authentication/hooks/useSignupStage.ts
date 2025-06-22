"use client";

import { useState } from "react";

export default function useSignupStage(): ReturnType {
  const [signupStage, setSignupStage] = useState<"role" | "info" | "interests">(
    "role"
  );

  return [signupStage, setSignupStage];
}

type ReturnType = [
  "role" | "info" | "interests",
  React.Dispatch<React.SetStateAction<"role" | "info" | "interests">>
];
