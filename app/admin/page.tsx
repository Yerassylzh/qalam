"use client";

import GenerationInput from "@/features/admin/components/GenerationInput";
import GenerationParameters from "@/features/admin/components/GenerationParameters";
import {
  GenerationProvider,
  useGenerationContext,
} from "@/features/admin/context/GenerationContext";
import React from "react";

export default function Wrapper() {
  return (
    <GenerationProvider>
      <Page />
    </GenerationProvider>
  );
}

export function Page() {
  const { articleContent, setArticleContent } = useGenerationContext();

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center ${
        articleContent ? "justify-start" : "justify-center"
      } gap-[60px]`}
    >
      {!articleContent && (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-bold md:text-[70px] text-[48px]">Сгенерировать</p>
          <p className="text-bold md:text-[32px] text-[28px]">
            Что бы вы хотели создать сегодня?
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 p-4 md:w-[750px] w-full">
        <GenerationParameters />
        <GenerationInput />
      </div>
      <GeneratedArticle />
    </div>
  );
}

function GeneratedArticle() {
  const { articleContent, setArticleContent } = useGenerationContext();

  return (
    <div>
      {articleContent && (
        <div className="flex flex-col gap-4 w-full md:w-[750px] bg-white rounded-lg shadow p-6">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Введите заголовок"
            value={articleContent.title}
            onChange={(e) => {
              setArticleContent((prev) =>
                prev
                  ? { ...prev, title: e.target.value }
                  : { title: e.target.value, bodyText: "", mainImageUrl: "" }
              );
            }}
          />
          <textarea
            className="border border-gray-300 rounded px-4 py-2 h-[max(500px,70vh)] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Введите текст статьи"
            onChange={(e) => {
              setArticleContent((prev) =>
                prev
                  ? { ...prev, bodyText: e.target.value }
                  : { title: "", bodyText: e.target.value, mainImageUrl: "" }
              );
            }}
            value={articleContent.bodyText}
          />
        </div>
      )}
    </div>
  );
}
