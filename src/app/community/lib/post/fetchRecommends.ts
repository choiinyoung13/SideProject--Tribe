import { supabase } from '@/supabase/supabaseClient'

export async function fetchRecommends() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const loggedInUserId = user?.id || null

  const { data, error } = await supabase
    .rpc('get_random_users', { count: 4, exclude_user_id: loggedInUserId })
    .limit(4)

  if (error) {
    console.error('이웃추천 데이터 조회중 오류가 발생했습니다:', error)
    return []
  }
  return data
}


