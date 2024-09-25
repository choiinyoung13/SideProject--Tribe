import { supabase } from "../../../supabase/supabaseClient";

// 카테고리별 게시물 개수를 집계하여 반환하는 함수
export async function fetchPostCategories() {
  // posts 테이블에서 모든 데이터를 가져옴
  const { data, error } = await supabase.from("posts").select("category");

  if (error) {
    console.error("데이터 조회 오류:", error.message);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // 카테고리별 개수를 집계하는 로직
  const categoryCounts = data.reduce((acc: Record<string, number>, post) => {
    const category = post.category || "기타"; // category가 없을 경우 "기타"로 처리
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // 카테고리 데이터 형태에 맞게 변환
  const categories = [
    { id: 0, title: "전체", count: data.length },
    { id: 1, title: "잡담", count: categoryCounts["잡담"] || 0 },
    { id: 2, title: "이벤트", count: categoryCounts["이벤트"] || 0 },
    { id: 3, title: "질문", count: categoryCounts["질문"] || 0 },
    { id: 4, title: "나눔", count: categoryCounts["나눔"] || 0 },
    { id: 5, title: "정보", count: categoryCounts["정보"] || 0 },
    { id: 6, title: "기타", count: categoryCounts["기타"] || 0 },
  ];

  return categories;
}
