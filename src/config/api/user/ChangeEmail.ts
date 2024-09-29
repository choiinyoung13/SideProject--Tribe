import Swal from 'sweetalert2'
import { supabase } from '../../../supabase/supabaseClient'

export const ChangeEmail = async (email: string) => {
  if (!email.trim()) return { success: false }

  try {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
    })

    if (error) {
      console.log('이메일 업데이트 요청 실패:', error)
      console.error('이메일 업데이트 중 오류가 발생했습니다:', error.message)
      Swal.fire({
        text: '이메일 업데이트 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return { success: false }
    }

    // 이메일이 정상적으로 발송된 경우 확인
    console.log('이메일 업데이트 요청 성공:', data)

    return { success: true, email: data.user.email }
  } catch (error) {
    console.error('이메일 변경 중 오류 발생:', error)
    return { success: false }
  }
}

// 인증 코드 검증 함수
export const verifyOtpCode = async (email: string, otp: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: 'email_change',
  })

  if (error) {
    console.error('인증번호 확인 중 오류 발생:', error)
    return { success: false, error: error.message || 'Unknown error' }
  }

  // 인증 성공 후 userinfo 테이블의 이메일 업데이트
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser() // 현재 인증된 사용자 정보 가져오기
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
