"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useGenerationContext } from "../context/GenerationContext";
import { fetchArticleContent } from "../lib/guardian";
import toast from "react-hot-toast";
import { generateArticle } from "../lib/llama";
import SpinnerSvg from "@/features/authentication/components/form/SpinnerSvg";
import { useRouter } from "next/navigation";
import { Article } from "../../../types/all";
import { createDraftArticle } from "../lib/articles";
import { useAuth } from "@/context/AuthContext";

export default function GenerationInput() {
  const {
    setArticleContent,
    address,
    setAddress,
    language,
    textAmount,
    style,
  } = useGenerationContext();

  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = useCallback(async () => {
    setIsGenerating(true);
    try {
      const articleContent = await fetchArticleContent(address);
      if (!articleContent) {
        toast.error("Не удалось получить содержимое статьи. Проверьте адрес.");
      } else {
        setArticleContent(
          await generateArticle(articleContent, language, textAmount, style)
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Произошла ошибка, кажется вы неправильно ввели адрес");
    }
    setIsGenerating(false);
  }, [setArticleContent, address, language, textAmount, style]);

  useRedirectToDraftEditorOnArticleGenerated();

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Введите тему или вставьте ссылку"
        className="w-full border rounded-lg py-2 px-4 pr-10 text-sm"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <button
        onClick={handleClick}
        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {isGenerating ? (
          <SpinnerSvg size={15} color="black" />
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

function useRedirectToDraftEditorOnArticleGenerated() {
  const { user } = useAuth();
  const router = useRouter();
  const { articleContent } = useGenerationContext();

  useEffect(() => {
    if (articleContent === null) {
      return;
    }

    const wrapper = async () => {
      const article = (await createDraftArticle(
        articleContent,
        user.id
      )) as Article;
      router.push(`/admin/home/edit_article/${article.id}`);
    };
    wrapper();
  }, [router, articleContent, user]);
}
