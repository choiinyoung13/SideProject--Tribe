import Swal from 'sweetalert2'
import { supabase } from '../../../supabase/supabaseClient'
import { createClient } from '@supabase/supabase-js'

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

export const sendVerificationEmail = async (email: string) => {
  try {
    // 1. OTP 인증 이메일 전송
    const { error } = await supabase.auth.signInWithOtp({
      email,
    })

    // 2. 이메일 전송 후 생성된 사용자 계정 삭제
    // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    // const supabaseKey = import.meta.env.VITE_SUPABASE_SURVICE_ROLE_KEY

    // const { data: user } = await supabase
    //   .from('userinfo')
    //   .select('id')
    //   .eq('email', email)
    //   .single()

    // if (user) {
    //   const { error: deleteError } = await createClient(
    //     supabaseUrl,
    //     supabaseKey
    //   ).auth.admin.deleteUser(user.id) // 계정 삭제

    //   if (deleteError) {
    //     console.error('계정 삭제 중 오류 발생:', deleteError.message)
    //   }
    // }

    if (error) {
      if ((error.message = 'email rate limit exceeded')) {
        Swal.fire({
          text: '인증메일을 발신 제한 횟수 초과입니다. (시간당 3번까지 가능)',
          icon: 'error',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
        return { success: false }
      }
      Swal.fire({
        text: '인증 이메일 전송 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return { success: false }
    }

    Swal.fire({
      text: '해당 이메일로 인증번호가 전송되었습니다.',
      icon: 'success',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })

    return { success: true }
  } catch (error) {
    console.error('인증 이메일 전송 중 오류 발생:', error)
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

  // 2. 이메일 인증 완료 후 생성된 사용자 계정 삭제
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_SURVICE_ROLE_KEY

  const { data: user } = await supabase
    .from('userinfo')
    .select('id')
    .eq('email', email)
    .single()

  if (user) {
    const { error: deleteError } = await createClient(
      supabaseUrl,
      supabaseKey
    ).auth.admin.deleteUser(user.id) // 계정 삭제

    if (deleteError) {
      console.error('계정 삭제 중 오류 발생:', deleteError.message)
    }
  }

  if (error) {
    Swal.fire({
      text: '인증번호 확인 중 오류가 발생했습니다.',
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
