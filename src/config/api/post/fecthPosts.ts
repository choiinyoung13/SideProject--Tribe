import { supabase } from "../../../supabase/supabaseClient";
import { PostType } from "../../../types/PostType";

export type FetchPostsResponse = {
  posts: PostType[];
  nextCursor: number | null;
};

// page별로 게시물 조회
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
    return { posts: [], nextCursor: null };
  }

  const hasMore = data.length === pageSize;
  const nextCursor = hasMore ? pageParam + 1 : null;

  console.log("조회된 데이터:", data);
  return { posts: data, nextCursor };
}

// 키워드로 게시물 조회
export async function fetchPostsByKeyword(
  keyword: string
): Promise<PostType[]> {
  // 검색어에 맞는 데이터 전체를 가져옴
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .ilike("title", `%${keyword}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("데이터 조회 오류:", error.message);
    return [];
  }

  console.log("검색어로 조회된 데이터:", data);
  return data || [];
}
