import Swal from 'sweetalert2'
import { supabase } from '../supabase/supabaseClient'

export const checkEmailExists = async (email: string, useSwal?: boolean) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('email')
    .eq('email', email)

  // 이미 가입된 계정이 있다면 true 반환
  if (data && data.length > 0) {
    Swal.fire({
      text: '이미 가입된 이메일입니다.',
      icon: 'warning',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })
    return true
  }

  if (error) {
    console.error('이메일 중복 확인중 에러가 발생했습니다:', error.message)
    return false
  }

  if (useSwal) {
    Swal.fire({
      text: '사용 가능한 이메일입니다.',
      icon: 'success',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })
  }

  return false
}
