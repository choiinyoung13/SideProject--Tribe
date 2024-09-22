export type PostType = {
  id: number;
  title: string;
  content: string;
  img_urls: string;
  liked: number | null;
  comments: string[] | null;
  user: string;
  category: string;
  created_at: string;
};
