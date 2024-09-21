import { supabase } from "../../../supabase/supabaseClient";

// 게시글 삽입 함수
export async function insertPost({
  title,
  content,
  imgUrls,
  category,
}: {
  title: string;
  content: string;
  imgUrls: string[];
  category: string;
}) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, img_urls: imgUrls, category }]);

  if (error) {
    console.error("게시글 저장 오류:", error);
    throw new Error("게시글 저장 오류: " + error.message);
  }

  return data;
}
