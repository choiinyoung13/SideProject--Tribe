import Swal from 'sweetalert2'
import { supabase } from '../../../supabase/supabaseClient'

// 사용자 이메일 변경
export const changeEmail = async (newEmail: string, id: string) => {
  // 먼저 해당 이메일이 이미 존재하는지 확인하는 추가 검증 로직을 넣을 수 있습니다.
  const { data: existingEmail } = await supabase
    .from('userinfo')
    .select('email')
    .eq('email', newEmail)
    .single()

  if (existingEmail) {
    Swal.fire({
      text: '이미 사용 중인 이메일입니다.',
      icon: 'warning',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })
    return { success: false, message: '이미 사용 중인 이메일입니다.' }
  }

  const { data, error } = await supabase
    .from('userinfo')
    .update({ email: newEmail })
    .eq('id', id)

  if (error) {
    Swal.fire({
      text: '이메일 업데이트 중 오류가 발생했습니다.',
      icon: 'warning',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })

    console.error('이메일 업데이트 중 오류 발생:', error.message)
    return { success: false, message: error.message }
  }

  return { success: true, data }
}

// 이메일 유효성 검사 후 인증번호 발송
export const sendVerificationEmail = async (email: string) => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    })

    if (error) {
      Swal.fire({
        text: '이메일 전송 중 오류가 발생했습니다. 다시 시도해 주세요.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return { success: false }
    }

    Swal.fire({
      text: '인증번호가 이메일로 전송되었습니다.',
      icon: 'success',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })

    return { success: true }
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error)
    return { success: false }
  }
}

// 인증 코드 검증 함수
export const verifyOtpCode = async (email: string, token: string) => {
  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: 'email',
  })

  if (error) {
    Swal.fire({
      text: '인증번호 확인 중 오류가 발생했습니다. 다시 시도해 주세요.',
      icon: 'error',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })
    console.error('인증번호 확인 중 오류 발생:', error)
    return { success: false }
  }

  Swal.fire({
    text: '올바른 인증번호입니다.',
    icon: 'success',
    confirmButtonColor: '#1E1E1E',
    confirmButtonText: '확인',
    scrollbarPadding: false,
  })

  return { success: true }
}
