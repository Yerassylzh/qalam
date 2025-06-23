"use client";

import { AuthProvider } from "@/context/AuthContext";
import Articles from "@/features/home/components/Articles";
import ArticlesBlind from "@/features/home/components/ArticlesBlind";
import Navbar from "@/features/home/components/Navbar";
import {
  BlindModeProvider,
  useBlindModeContext,
} from "@/features/home/context/BlindModeContext";

export default function Wrapper() {
  return (
    <AuthProvider>
      <BlindModeProvider>
        <Home />
      </BlindModeProvider>
    </AuthProvider>
  );
}

function Home() {
  const { isBlindMode } = useBlindModeContext();

  return (
    <>
      <Navbar />
      {!isBlindMode ? <Articles /> : <ArticlesBlind />}
    </>
  );
}
