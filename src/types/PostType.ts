type CommentType = {
  id: string;
  user: string;
  text: string;
  timestamp: string;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  img_urls: string[];
  liked: string[] | null;
  comments: CommentType[] | null;
  user: string;
  category: string;
  created_at: string;
};
