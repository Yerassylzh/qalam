"use server";

import { prisma } from "@/lib/prisma";
import { Article, ArticleContent } from "../../../types/all";

export async function getArticleById(articleId: number): Promise<Article | null> {
  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    }
  }) as Article | null;

  return article;
}

export async function saveArticle(articleId: number, article: ArticleContent): Promise<void> {
  await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      title: article.title,
      bodyText: article.bodyText,
      mainImageUrl: article.mainImageUrl,
      is_published: false,
    }
  });
}

export async function saveAndPublishArticle(articleId: number, article: ArticleContent): Promise<void> {
  await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      title: article.title,
      bodyText: article.bodyText,
      mainImageUrl: article.mainImageUrl,
      is_published: true,
    }
  });
}

export async function createDraftArticle(articleContent: ArticleContent, authorId: number): Promise<Article> {
  return (await prisma.article.create({
    data: {
      title: articleContent.title,
      bodyText: articleContent.bodyText,
      mainImageUrl: articleContent.mainImageUrl,
      is_published: false,
      authorId: authorId
    }
  })) as Article;
}

export async function fetchDrafts(userId: number): Promise<Article[]> {
  return (await prisma.article.findMany({
    where: {
      authorId: userId,
      is_published: false
    },
    orderBy: {
      updatedAt: "desc"
    }
  })) as Article[];
}

export async function fetchPublishedArticles(userId: number): Promise<Article[]> {
  return (await prisma.article.findMany({
    where: {
      authorId: userId,
      is_published: true
    },
    orderBy: {
      updatedAt: "desc"
    }
  })) as Article[];
}

export async function fetchArticles(userId: number): Promise<Article[]> {
  return (await prisma.article.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      updatedAt: "desc"
    }
  })) as Article[];
}
