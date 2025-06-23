"use server";

import { Article } from "@/types/all";
import { prisma } from "@/lib/prisma";

export async function getAllArticles(): Promise<Article[]> {
  return await prisma.article.findMany()
}

export async function getArticle(articleId: number): Promise<Article> {
  return await prisma.article.findUnique({
    where: {
      id: articleId,
    }
  }) as Article
}