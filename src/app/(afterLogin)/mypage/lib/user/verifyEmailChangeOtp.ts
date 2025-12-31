import { supabase } from '@/supabase/supabaseClient'

// 인증 코드 검증 함수
export const verifyEmailChangeOtp = async (email: string, otp: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: 'email_change',
  })

  if (error) {
    console.error('인증번호 확인 중 오류 발생:', error)
    return { success: false, error: error.message || 'Unknown error' }
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error('사용자 정보를 가져오는 중 오류 발생:', userError.message)
    return { success: false, error: userError.message }
  }

  if (user) {
    const { error: updateError } = await supabase
      .from('userinfo')
      .update({ email })
      .eq('id', user.id)

    if (updateError) {
      console.error(
        'userinfo 테이블에서 이메일 업데이트 중 오류 발생:',
        updateError.message
      )
      return { success: false, error: updateError.message }
    }

    console.log('userinfo 테이블 이메일 업데이트 성공')
  }

  return { success: true, data }
}


