import { useEffect, useRef } from "react";
import { Article } from "@/types/all";
import Image from "next/image";

function getBestVoice(langCode: "ru" | "kk" | "en") {
  const voices = window.speechSynthesis.getVoices();

  if (langCode === "en") {
    // Prefer Microsoft for English
    const msVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") && v.name.toLowerCase().includes("microsoft")
    );
    if (msVoice) return msVoice;
  } else {
    // Prefer Google Russian for ru/kk
    const googleRu = voices.find(
      (v) => v.lang.startsWith("ru") && v.name.toLowerCase().includes("google")
    );
    if (googleRu) return googleRu;
  }

  return (
    voices.find((v) => v.lang.startsWith(langCode)) ||
    voices.find((v) => v.lang.startsWith("en"))
  );
}

function detectLang(text: string): string {
  if (/[әіңғүұқөһ]/i.test(text)) return "kk";
  if (/[а-яё]/i.test(text)) return "ru";
  return "en"; // Default
}

export const useSpeech = (text: string) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!text) return;

    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    let langCode = detectLang(text) || "en";
    if (langCode === "kk") langCode = "ru";
    console.log(langCode);
    const voice = getBestVoice(langCode as "en" | "ru" | "kk");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    if (voice) {
      utterance.voice = voice;
    } else {
      utterance.lang = langCode;
    }

    window.speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);
};

type ArticleViewBlindProps = {
  article: Article;
};

export const ArticleViewBlind: React.FC<ArticleViewBlindProps> = ({
  article,
}) => {
  useSpeech(`${article.bodyText}`);
  return (
    <article
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "0.5rem",
          wordBreak: "break-word",
        }}
      >
        {article.title}
      </h1>
      <Image
        src={article.mainImageUrl}
        alt={article.title}
        width={800}
        height={400}
        style={{
          width: "100%",
          borderRadius: "6px",
          marginBottom: "0.5em",
          height: "auto",
        }}
      />
      <div
        style={{
          color: "#888",
          fontSize: "0.95rem",
          marginBottom: "1.5rem",
        }}
      >
        Опубликованно в: {article.updatedAt.toLocaleDateString()}
      </div>
      <div
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.7,
          wordBreak: "break-word",
        }}
      >
        <em>Аудиоверсия статьи воспроизводится автоматически.</em>
      </div>
    </article>
  );
};

export default ArticleViewBlind;
