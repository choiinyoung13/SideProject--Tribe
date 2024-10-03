import { supabase } from '../../../supabase/supabaseClient'

export async function deletePost(id: number): Promise<{ error: any }> {
  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('게시물 삭제 오류:', error.message)
  }

  return { error }
}
