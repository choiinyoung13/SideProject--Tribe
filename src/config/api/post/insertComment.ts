import { supabase } from '../../../supabase/supabaseClient'

// 게시글 삽입 함수
export async function insertComment({
  postId,
  userId,
  userName,
  comment,
  userProfileUrl,
}: {
  postId: number
  userId: string
  userName: string
  comment: string
  userProfileUrl: string
}) {
  const timestamp = new Date().toISOString() // 현재 시간을 ISO 8601 형식으로 가공

  // 기존 comments 필드를 가져옴
  const { data: postData, error: fetchError } = await supabase
    .from('posts')
    .select('comments')
    .eq('id', postId)
    .single() // 특정 게시글 조회

  if (fetchError) {
    console.error('게시글 조회 오류:', fetchError)
    throw new Error('게시글 조회 오류: ' + fetchError.message)
  }

  // 새로운 댓글 생성
  const newComment = {
    id: userId,
    user: userName,
    text: comment,
    userProfileUrl,
    timestamp,
  }

  // 기존 comments 배열에 새 댓글 추가 (null일 경우 빈 배열로 초기화)
  const commentsArray = postData?.comments || []
  const updatedComments = [newComment, ...commentsArray]

  // comments 필드를 업데이트
  const { data, error } = await supabase
    .from('posts')
    .update({ comments: updatedComments })
    .eq('id', postId)

  if (error) {
    console.error('댓글 업데이트 오류:', error)
    throw new Error('댓글 업데이트 오류: ' + error.message)
  }

  return data
}
