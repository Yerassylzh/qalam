import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full px-[26px] py-[17px] flex items-center justify-between">
      <p className="font-bold text-[16px]">Qalam.ai admin</p>
      <div className="flex gap-[15px]">
        <Link href="/admin">Сгенерировать</Link>
        <Link href="/admin/drafts">Черновики</Link>
        <Link href="/admin/published">Опубликованные</Link>
        <Link href="/admin/articles">Все статьи</Link>
      </div>
    </div>
  );
}
