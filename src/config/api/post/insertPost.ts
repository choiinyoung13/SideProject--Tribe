import { supabase } from "../../../supabase/supabaseClient";

// post insert 함수
export async function insertPost({
  title,
  content,
  imgUrls,
  category,
  userId,
}: {
  title: string;
  content: string;
  imgUrls: string[];
  category: string;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, img_urls: imgUrls, category, user: userId }]);

  if (error) {
    console.error("게시글 저장 오류:", error);
    throw new Error("게시글 저장 오류: " + error.message);
  }

  return data;
}

//  유저의 아이디를 liked 필드에 저장 + 같은 아이디가 이미 존재할 경우(2번 누른 경우) liked 필드에서 삭제 (좋아요 기능)
export async function insertUserIdIntoLiked({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  // 게시글에서 liked 배열을 가져옴
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("liked")
    .eq("id", postId)
    .single();

  if (fetchError) {
    console.error("게시글 가져오기 오류:", fetchError);
    throw new Error("게시글 가져오기 오류: " + fetchError.message);
  }

  const likedArray = post?.liked || [];

  // liked 배열에 userId가 있으면 제거, 없으면 추가
  if (likedArray.includes(userId)) {
    // userId가 있으면 배열에서 제거
    const updatedLikedArray = likedArray.filter((id: string) => id !== userId);

    // 업데이트 쿼리 실행
    const { data, error: updateError } = await supabase
      .from("posts")
      .update({ liked: updatedLikedArray })
      .eq("id", postId);

    if (updateError) {
      console.error("좋아요 제거 오류:", updateError);
      throw new Error("좋아요 제거 오류: " + updateError.message);
    }

    return { message: "좋아요가 취소되었습니다.", data };
  } else {
    // userId가 없으면 배열에 추가
    likedArray.push(userId);

    // 업데이트 쿼리 실행
    const { data, error: updateError } = await supabase
      .from("posts")
      .update({ liked: likedArray })
      .eq("id", postId);

    if (updateError) {
      console.error("좋아요 추가 오류:", updateError);
      throw new Error("좋아요 추가 오류: " + updateError.message);
    }

    return { message: "좋아요가 추가되었습니다.", data };
  }
}
