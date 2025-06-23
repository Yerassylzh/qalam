"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import ArticleView from "@/features/home/components/ArticleView";
import useFetchArtice from "@/hooks/useFetchArtice";
import Navbar from "@/features/home/components/Navbar";
import { useBlindModeContext } from "@/features/home/context/BlindModeContext";
import { ArticleViewBlind } from "@/features/home/components/ArticleViewBlind";

export default function Page() {
  const { articleId } = useParams<{ articleId: string }>();
  const { isBlindMode } = useBlindModeContext();
  const articleIdNum = useMemo(() => {
    return Number(articleId);
  }, [articleId]);
  const article = useFetchArtice(articleIdNum);

  if (isNaN(articleIdNum)) {
    return <div>Page not found</div>;
  }

  if (article === null) {
    return <p className="">Подождите...</p>;
  }

  return (
    <>
      <Navbar />
      {isBlindMode ? (
        <ArticleViewBlind article={article} />
      ) : (
        <ArticleView article={article} />
      )}
    </>
  );
}
