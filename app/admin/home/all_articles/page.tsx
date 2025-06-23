"use client";

import React, { useEffect, useState } from "react";
import { Article } from "@/types/all";
import ArticlePreview from "@/features/admin/components/ArticlePreview";
import { useAuth } from "@/context/AuthContext";
import { fetchArticles } from "@/features/admin/lib/articles";

export default function Page() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    const wrapper = async () => {
      setArticles(await fetchArticles(user.id));
    };
    wrapper();
  }, [user.id]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <div className="p-[10px] xl:w-[768px] md:w-[600px] w-full flex-1 flex flex-col md:gap-[40px] gap-[20px]">
        <p className="font-bold text-[48px]">Все статьи</p>
        {articles !== null ? (
          articles.length > 0 ? (
            <div className="flex flex-col gap-[35px]">
              {articles.map((article, index) => (
                <ArticlePreview key={index} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-[20px]">Тут пока пусто</p>
          )
        ) : (
          <p>Подождите...</p>
        )}
      </div>
    </div>
  );
}
