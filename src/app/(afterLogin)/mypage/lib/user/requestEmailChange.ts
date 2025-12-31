import Swal from 'sweetalert2'
import { supabase } from '@/supabase/supabaseClient'

export const requestEmailChange = async (email: string) => {
  if (!email.trim()) return { success: false }

  try {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
    })

    if (error) {
      console.log('이메일 업데이트 요청 실패:', error)
      console.error('이메일 업데이트 중 오류가 발생했습니다:', error.message)

      // Supabase에서 이메일 변경 요청 시 인증 메일은 발송되지만 API 에러가 발생할 수 있음
      if (
        error.message.includes('invalid') &&
        !error.message.includes('already registered')
      ) {
        Swal.fire({
          text: '인증 메일이 발송되었습니다. 이메일을 확인해주세요.',
          icon: 'success',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
        return { success: true }
      }

      Swal.fire({
        text: '이메일 업데이트 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return { success: false }
    }

    console.log('이메일 업데이트 요청 성공:', data)
    return { success: true, email: data.user.email }
  } catch (error) {
    console.error('이메일 변경 중 오류 발생:', error)
    return { success: false }
  }
}


