"use client";

import EditArticle from "@/features/admin/components/EditArticle";
import { useParams } from "next/navigation";

export default function DraftEditPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const articleIdNum = Number(articleId);

  if (isNaN(articleIdNum)) {
    return <div>Invalid draft ID</div>;
  }

  return <EditArticle articleId={articleIdNum} />;
}
