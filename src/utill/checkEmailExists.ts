import { supabase } from '../supabase/supabaseClient'

export const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('email')
    .eq('email', email)

  // 이미 가입된 계정이 있다면 true 반환
  if (data && data.length > 0) {
    return true
  }

  if (error) {
    console.error('이메일 중복 확인중 에러가 발생했습니다:', error.message)
    return false
  }

  return false
}
