"use client";

import { Article } from '@/types/all'
import { useEffect, useState } from 'react'
import { getArticle } from '@/features/home/lib/articles';

export default function useFetchArtice(articleId: number) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const wrapper = async () => {
      if (!isNaN(articleId)) {
        setArticle(await getArticle(articleId));
      }
    };
    wrapper();
  }, [articleId]);

  return article;  
}
