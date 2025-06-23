"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import ArticleView from "@/features/home/components/ArticleView";
import useFetchArtice from "@/hooks/useFetchArtice";
import Navbar from "@/features/home/components/Navbar";

export default function Page() {
  const { articleId } = useParams<{ articleId: string }>();
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
      <ArticleView article={article} />
    </>
  );
}
