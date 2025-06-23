"use client";

import React, { createContext, useContext, useState } from "react";
import useSignupStage from "../hooks/useSignupStage";

interface SignupContextType {
  userRole: "user" | "admin" | null;
  setUserRole: React.Dispatch<React.SetStateAction<"user" | "admin" | null>>;
  interests: string[];
  setInterests: React.Dispatch<React.SetStateAction<string[]>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  surname: string | null;
  setSurname: React.Dispatch<React.SetStateAction<string | null>>;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  password: string | null;
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
  signupStage: "role" | "info" | "interests";
  setSignupStage: React.Dispatch<
    React.SetStateAction<"role" | "info" | "interests">
  >;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<"user" | "admin" | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [signupStage, setSignupStage] = useSignupStage();

  const data = {
    userRole: userRole,
    setUserRole: setUserRole,

    interests: interests,
    setInterests: setInterests,

    name: name,
    setName: setName,

    surname: surname,
    setSurname: setSurname,

    email: email,
    setEmail: setEmail,

    password: password,
    setPassword: setPassword,

    signupStage: signupStage,
    setSignupStage: setSignupStage,
  };

  return (
    <SignupContext.Provider value={data}>{children}</SignupContext.Provider>
  );
}

export const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw Error("useSignupContext can be called within SignupProvider");
  }
  return context;
};
