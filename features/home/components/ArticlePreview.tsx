import { Article } from "@/types/all";
import Image from "next/image";
import React from "react";

interface Props {
  article: Article;
}

export default function ArticlePreview({ article }: Props) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        {article.mainImageUrl && (
          <div className="md:shrink-0">
            <Image
              width={0}
              height={0}
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={article.mainImageUrl}
              alt={article.title}
              unoptimized
            />
          </div>
        )}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
              {article.title}
            </h2>
            <p className="mt-2 text-gray-600 line-clamp-3">
              {article.bodyText}
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {new Date(article.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
