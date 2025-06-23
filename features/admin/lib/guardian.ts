"use server";

import { ArticleContent } from "../../../types/all";

const baseUrl = "https://content.guardianapis.com";
const apiKey = process.env.GUARDIAN_API_KEY as string;

function extractPathFromUrl(url: string): string | null {
  try {
    const guardianUrl = new URL(url);
    if (!guardianUrl.hostname.includes("theguardian.com")) return null;
    return guardianUrl.pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return null;
  }
}

export async function fetchArticleContent(articleUrl: string): Promise<ArticleContent> {
  const path = extractPathFromUrl(articleUrl);
  if (!path) throw new Error("Invalid Guardian article URL");

  const endpoint = `${baseUrl}/${path}?api-key=${apiKey}&show-fields=bodyText,thumbnail,headline`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.statusText}`);
  }

  const json = await res.json();

  const content = json?.response?.content;
  if (!content) throw new Error("No content found in API response");

  return {
    title: content.webTitle,
    bodyText: content.fields?.bodyText || "",
    mainImageUrl: content.fields?.thumbnail || "",
  };
}
