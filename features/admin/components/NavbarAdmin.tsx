"use client";

import { useDeviceType } from "@/context/DeviceTypeContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { logout } from "@/features/authentication/lib/users/login";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isMobile } = useDeviceType();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMenuOpened(false);
  }, [isMobile]);

  return (
    <div className="w-full px-[26px] py-[17px] flex items-center justify-between md:flex-row flex-col">
      <div className="md:w-fit w-full flex items-center justify-between">
        <p className="font-bold text-[16px]">Qalam.ai admin</p>
        {isMobile && (
          <button
            onClick={() => setIsMenuOpened((prev) => !prev)}
            className="md:hidden block"
            aria-label="Открыть меню"
            type="button"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
      {!isMobile || (isMobile && isMenuOpened) ? (
        <div className="flex md:flex-row flex-col gap-[15px] md:w-fit w-screen px-[10px] md:py-0 py-[10px] text-start md:border-none border-b-[1px]">
          <Link href="/admin/home">Сгенерировать</Link>
          <Link href="/admin/home/drafts">Черновики</Link>
          <Link href="/admin/home/published">Опубликованные</Link>
          <Link href="/admin/home/all_articles">Все статьи</Link>
          <button
            onClick={async () => {
              await logout();
              router.push("/signup");
            }}
          >
            Выйти
          </button>
        </div>
      ) : null}
    </div>
  );
}
