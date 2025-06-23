"use client";

import React from "react";
import { Article } from "../../../types/all";
import Link from "next/link";

function getCroppedBodyText(bodyText: string): string {
  if (bodyText.length < 234) {
    return bodyText;
  }
  return bodyText.slice(0, 234) + "...";
}

function getCroppedTitile(title: string): string {
  if (title.length > 70) {
    return title.slice(0, 70) + "...";
  }
  return title;
}

function getFormattedDate(date: Date): string {
  return (
    date.getDate().toString().padStart(2, "0") +
    "." +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    date.getFullYear() +
    " — " +
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
}

interface Props {
  article: Article;
}

export default function ArticlePreview({ article }: Props) {
  return (
    <div className="px-[10px] py-[25px] w-full border border-gray-400 rounded-[10px] flex xl:flex-row flex-col gap-[30px]">
      <div className="flex-1 flex flex-col gap-[24px] items-start justify-start">
        <p className="text-[20px] font-bold">
          {getCroppedTitile(article.title)}
        </p>
        <p className="text-[16px]">{getCroppedBodyText(article.bodyText)}</p>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-[5px]">
            <p className="text-[16px]">{getFormattedDate(article.updatedAt)}</p>
            {article.is_published && (
              <p className="text-[13px] text-green-700">Опубликованно</p>
            )}
          </div>
          <Link href={`/admin/home/edit_article/${article.id}`}>
            <button className="cursor-pointer border border-gray-400 rounded-[10px] py-[7px] px-[14px]">
              Редактировать
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
