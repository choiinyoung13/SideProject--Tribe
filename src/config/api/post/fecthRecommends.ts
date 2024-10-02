import { supabase } from '../../../supabase/supabaseClient'

export async function fetchRecommends() {
  // 로그인된 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // user 정보가 없으면 로그인되지 않은 상태로 간주
  const loggedInUserId = user?.id || null

  // 로그인된 경우 해당 사용자를 제외하고, status_message가 존재하는 사용자 중 무작위로 4개 선택
  let query = supabase
    .from('userinfo')
    .select('id, email, avatar_url, nickname, status_message')

  // 로그인된 경우 해당 사용자는 제외
  if (loggedInUserId) {
    query = query.neq('id', loggedInUserId)
  }

  // 랜덤으로 4개의 데이터를 선택하기 위해 raw SQL 사용
  const { data, error } = await supabase
    .rpc('get_random_users', { count: 4, exclude_user_id: loggedInUserId })
    .limit(4) // 이 limit은 추가로 안전을 위해 사용

  if (error) {
    console.error('이웃추천 데이터 조회중 오류가 발생했습니다:', error)
    return []
  }

  console.log(`추천: ${JSON.stringify(data)}`)

  return data
}
