import { supabase } from '@/supabase/supabaseClient'

// 댓글 삽입 함수
export async function insertComment({
  postId,
  userId,
  comment,
}: {
  postId: number
  userId: string
  comment: string
}) {
  const timestamp = new Date().toISOString()

  const { data: postData, error: fetchError } = await supabase
    .from('posts')
    .select('comments')
    .eq('id', postId)
    .single()

  if (fetchError) {
    console.error('게시글 조회 오류:', fetchError)
    throw new Error('게시글 조회 오류: ' + fetchError.message)
  }

  const newComment = {
    id: userId,
    text: comment,
    timestamp,
  }

  const commentsArray = postData?.comments || []
  const updatedComments = [newComment, ...commentsArray]

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


