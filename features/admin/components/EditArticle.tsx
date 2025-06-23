import React, { useCallback, useEffect, useState } from "react";
import { Article, ArticleContent } from "../types/all";
import ArrowGreenButton from "@/features/authentication/components/form/ArrowGreenButton";
import {
  getArticleById,
  saveAndPublishArticle,
  saveArticle,
} from "../lib/articles";
import toast from "react-hot-toast";

interface Props {
  articleId: number;
}

export default function EditArticle({ articleId }: Props) {
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [articleData, setArticleData] = useState<ArticleContent | undefined>(
    undefined
  );
  const [isSavingArticle, setIsSavingArticle] = useState(false);
  const [isSavingAndPublishingArticle, setIsSavingAndPublishingArticle] =
    useState(false);

  useEffect(() => {
    const wrapper = async () => {
      const fetchedArticle = (await getArticleById(articleId)) as Article;
      setArticle(fetchedArticle);

      if (fetchedArticle) {
        setArticleData({
          title: fetchedArticle.title,
          bodyText: fetchedArticle.bodyText,
          mainImageUrl: fetchedArticle.mainImageUrl,
        });
      }
    };
    wrapper();
  }, [articleId]);

  const onSaveArticle = useCallback(async () => {
    setIsSavingArticle(true);
    if (!articleData) {
      return;
    }

    await saveArticle(articleId, articleData);
    toast.success("Успешьно сохранено в черновики");
    setIsSavingArticle(false);
  }, [articleId, articleData]);

  const onSaveAndPublishArticle = useCallback(async () => {
    setIsSavingAndPublishingArticle(true);
    if (!articleData) {
      return;
    }

    await saveAndPublishArticle(articleId, articleData);
    toast.success("Успешьно сохранено и опубликовано");
    setIsSavingAndPublishingArticle(false);
  }, [articleId, articleData]);

  if (!article || !articleData) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <p className="md:text-[40px] text-[20px]">Подождите...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-full md:w-[750px] bg-white rounded-lg shadow p-6">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Введите заголовок"
          value={articleData.title}
          onChange={(e) => {
            setArticleData((prev) => {
              if (!prev) return;
              return { ...prev, title: e.target.value };
            });
          }}
        />
        <textarea
          className="border border-gray-300 rounded px-4 py-2 h-[max(500px,70vh)] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Введите текст статьи"
          onChange={(e) => {
            setArticleData((prev) => {
              if (!prev) return;
              return { ...prev, bodyText: e.target.value };
            });
          }}
          value={articleData.bodyText}
        />
        <div className="w-full items-center justify-end flex gap-[10px]">
          <ArrowGreenButton
            className="w-[250px]"
            text="Сохранить в черновики"
            onClick={onSaveArticle}
            isLoading={isSavingArticle}
          />
          <ArrowGreenButton
            className="w-[250px]"
            text="Сохранить и опубликовать"
            onClick={onSaveAndPublishArticle}
            isLoading={isSavingAndPublishingArticle}
          />
        </div>
      </div>
    </div>
  );
}
