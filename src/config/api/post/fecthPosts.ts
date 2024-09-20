import { supabase } from "../../../supabase/supabaseClient";
import { PostType } from "../../../types/PostType";

export async function fetchAllPosts(): Promise<PostType[]> {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("데이터 조회 오류:", error.message);
    return [];
  }

  if (!data || data.length === 0) {
    console.error("데이터가 없습니다.");
    return [];
  }

  console.log("조회된 데이터:", data);
  return data;
}
