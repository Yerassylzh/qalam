"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ArticleContent } from "../../../types/all";

interface GenerationContextType {
  language: "eng" | "ru" | "kk";
  setLanguage: Dispatch<SetStateAction<"eng" | "ru" | "kk">>;
  textAmount: "low" | "standard" | "high";
  setTextAmount: Dispatch<SetStateAction<"low" | "standard" | "high">>;
  style: "steppe" | "neutral" | "formal";
  setStyle: Dispatch<SetStateAction<"steppe" | "neutral" | "formal">>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  articleContent: ArticleContent | null;
  setArticleContent: Dispatch<SetStateAction<ArticleContent | null>>;
}

const GenerationContext = createContext<GenerationContextType | undefined>(
  undefined
);

export function GenerationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<"eng" | "ru" | "kk">("ru");
  const [textAmount, setTextAmount] = useState<"low" | "standard" | "high">(
    "standard"
  );
  const [style, setStyle] = useState<"steppe" | "neutral" | "formal">("steppe");
  const [address, setAddress] = useState<string>("");
  const [articleContent, setArticleContent] = useState<ArticleContent | null>(
    null
  );

  const data = {
    language: language,
    setLanguage: setLanguage,

    textAmount: textAmount,
    setTextAmount: setTextAmount,

    style: style,
    setStyle: setStyle,

    address: address,
    setAddress: setAddress,

    articleContent: articleContent,
    setArticleContent: setArticleContent,
  };

  return (
    <GenerationContext.Provider value={data}>
      {children}
    </GenerationContext.Provider>
  );
}

export const useGenerationContext = () => {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error(
      "useGenerationContext must be wrapped within GenerationProvider"
    );
  }
  return context;
};
