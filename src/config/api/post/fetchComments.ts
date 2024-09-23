import { supabase } from '../../../supabase/supabaseClient'

export async function fetchComments() {
  // 데이터 정렬 (created_at 기준 최신순으로 정렬)
  const { data, error } = await supabase.from('posts').select('comments')

  if (error) {
    console.error('댓글 업데이트 오류:', error)
    throw new Error('댓글 업데이트 오류: ' + error.message)
  }

  return data
}
