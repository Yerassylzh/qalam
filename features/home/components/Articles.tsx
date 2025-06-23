import { Article } from "@/types/all";
import React from "react";
import useAllArticles from "../hooks/useAllArticles";
import ArticlePreview from "./ArticlePreview";
import { useRouter } from "next/navigation";

export default function Articles() {
  const articles = useAllArticles();
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-2">
      {articles &&
        articles.map((article: Article, index: number) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => {
              router.push(`/articles/${article.id}`);
            }}
          >
            <ArticlePreview article={article} />
          </div>
        ))}
    </div>
  );
}
