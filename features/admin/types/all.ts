import { User } from "@/types/user";

export interface ArticleContent {
  title: string;
  bodyText: string;
  mainImageUrl: string;
}

export interface Article {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  bodyText: string;
  mainImageUrl: string;
  is_published: boolean;

  authorId: number;
  author?: User;
}
