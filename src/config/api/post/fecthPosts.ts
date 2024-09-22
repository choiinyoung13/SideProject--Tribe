import { supabase } from "../../../supabase/supabaseClient";
import { PostType } from "../../../types/PostType";

export type FetchPostsResponse = {
  posts: PostType[];
  nextCursor: number | null;
};

export async function fetchPostsPerPage(
  pageParam: number = 0,
  pageSize: number = 8
): Promise<FetchPostsResponse> {
  const start = pageParam * pageSize;
  const end = start + pageSize - 1;

  // 데이터 정렬 (created_at 기준 최신순으로 정렬)
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) {
    console.error("데이터 조회 오류:", error.message);
    return { posts: [], nextCursor: null };
  }

  if (!data || data.length === 0) {
    console.error("데이터가 없습니다.");
    return { posts: [], nextCursor: null };
  }

  const hasMore = data.length === pageSize;
  const nextCursor = hasMore ? pageParam + 1 : null;

  console.log("조회된 데이터:", data);
  return { posts: data, nextCursor };
}
