"use client";

import React, { useEffect, useState } from "react";
import { Article } from "@/types/all";
import ArticlePreview from "@/features/admin/components/ArticlePreview";
import { useAuth } from "@/context/AuthContext";
import { fetchDrafts } from "@/features/admin/lib/articles";

export default function Page() {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<Article[] | null>(null);

  useEffect(() => {
    const wrapper = async () => {
      setDrafts(await fetchDrafts(user.id));
    };
    wrapper();
  }, [user.id]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <div className="p-[10px] xl:w-[768px] md:w-[600px] w-full flex-1 flex flex-col md:gap-[40px] gap-[20px]">
        <p className="font-bold text-[48px]">Черновики</p>
        {drafts !== null ? (
          drafts.length > 0 ? (
            <div className="flex flex-col gap-[35px]">
              {drafts.map((draft, index) => (
                <ArticlePreview key={index} article={draft} />
              ))}
            </div>
          ) : (
            <p className="text-[20px]">Тут пока пусто</p>
          )
        ) : (
          <p>Подождите...</p>
        )}
      </div>
    </div>
  );
}
