import { supabase } from '@/supabase/supabaseClient'

// 유저의 아이디를 liked 필드에 저장 + 같은 아이디가 이미 존재할 경우 liked 필드에서 삭제 (좋아요 기능)
export async function togglePostLike({
  postId,
  userId,
}: {
  postId: number
  userId: string
}) {
  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select('liked')
    .eq('id', postId)
    .single()

  if (fetchError) {
    console.error('게시글 가져오기 오류:', fetchError)
    throw new Error('게시글 가져오기 오류: ' + fetchError.message)
  }

  const likedArray = post?.liked || []

  if (likedArray.includes(userId)) {
    const updatedLikedArray = likedArray.filter((id: string) => id !== userId)

    const { data, error: updateError } = await supabase
      .from('posts')
      .update({ liked: updatedLikedArray })
      .eq('id', postId)

    if (updateError) {
      console.error('좋아요 제거 오류:', updateError)
      throw new Error('좋아요 제거 오류: ' + updateError.message)
    }

    return { message: '좋아요가 취소되었습니다.', data }
  }

  likedArray.push(userId)
  const { data, error: updateError } = await supabase
    .from('posts')
    .update({ liked: likedArray })
    .eq('id', postId)

  if (updateError) {
    console.error('좋아요 추가 오류:', updateError)
    throw new Error('좋아요 추가 오류: ' + updateError.message)
  }

  return { message: '좋아요가 추가되었습니다.', data }
}


