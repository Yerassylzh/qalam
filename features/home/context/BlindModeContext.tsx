"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";

interface BlindModeContextType {
  isBlindMode: boolean;
  setIsBlindMode: Dispatch<SetStateAction<boolean>>;
}

const BlindModeContext = createContext<BlindModeContextType | undefined>(
  undefined
);

export const BlindModeProvider = ({ children }: { children: ReactNode }) => {
  const [isBlindMode, setIsBlindMode] = useLocalStorage("isBlindMode", false);

  const data = {
    isBlindMode: isBlindMode,
    setIsBlindMode: setIsBlindMode,
  };

  return (
    <BlindModeContext.Provider value={data}>
      {children}
    </BlindModeContext.Provider>
  );
};

export const useBlindModeContext = () => {
  const context = useContext(BlindModeContext);
  if (context === undefined) {
    throw new Error(
      "useBlindModeContext must be used within a BlindModeContext"
    );
  }
  return context;
};
