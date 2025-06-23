"use client";

import { Article } from "@/types/all";
import { useEffect, useState } from "react";
import { getAllArticles } from "../lib/articles";

export default function useAllArticles() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    const wrapper = async () => {
      setArticles(await getAllArticles());
    };

    wrapper();
  }, []);
  
  return articles;
}