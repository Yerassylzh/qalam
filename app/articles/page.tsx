"use client";

import Articles from "@/features/home/components/Articles";
import ArticlesBlind from "@/features/home/components/ArticlesBlind";
import Navbar from "@/features/home/components/Navbar";
import { useBlindModeContext } from "@/features/home/context/BlindModeContext";

export default function Home() {
  const { isBlindMode } = useBlindModeContext();

  return (
    <>
      <Navbar />
      {!isBlindMode ? <Articles /> : <ArticlesBlind />}
    </>
  );
}
