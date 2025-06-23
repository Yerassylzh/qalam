"use client";

import { Article } from "@/types/all";
import React from "react";
import Image from "next/image";

export default function ArticlePreviewBlind({ article }: { article: Article }) {
  return (
    <article
      aria-label="Article preview"
      style={{
        fontSize: "1.5em",
        background: "#000",
        color: "#fff",
        padding: "1em",
        borderRadius: "8px",
      }}
    >
      <h2 tabIndex={0} style={{ fontWeight: "bold", marginBottom: "0.5em" }}>
        {article.title}
      </h2>
      {article.mainImageUrl && (
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
      )}
      <p>Опубликованно: {article.updatedAt.toLocaleDateString()}</p>
    </article>
  );
}
