import Swal from 'sweetalert2'
import { supabase } from '../../../supabase/supabaseClient'

// 사용자 닉네임 변경
export const ChangeStatusMessage = async (message: string, id: string) => {
  const { data, error } = await supabase
    .from('userinfo')
    .update({ status_message: message })
    .eq('id', id)

  if (error) {
    Swal.fire({
      text: '상태메세지 업데이트 중 오류가 발생했습니다.',
      icon: 'warning',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })

    console.error('상태메세지 업데이트 중 오류 발생:', error.message)
    return { success: false, message: error.message }
  }

  return { success: true, data }
}
