import { Article } from "@/types/all";
import React from "react";
import Image from "next/image";

type ArticleViewProps = {
  article: Article;
};

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  return (
    <article
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Image
        src={article.mainImageUrl}
        alt={article.title}
        width={800}
        height={400}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 12,
          marginBottom: "1rem",
          objectFit: "cover",
        }}
      />
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "0.5rem",
          wordBreak: "break-word",
        }}
      >
        {article.title}
      </h1>
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
        {article.bodyText}
      </div>
    </article>
  );
};

export default ArticleView;
