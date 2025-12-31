import { supabase } from '@/supabase/supabaseClient'

export async function deletePost(id: number): Promise<{ error: unknown }> {
  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    const message =
      typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: unknown }).message)
        : String(error)
    console.error('게시물 삭제 오류:', message)
  }

  return { error }
}


