import { supabase } from '@/supabase/supabaseClient'
import Swal from 'sweetalert2'

export const deleteUser = async () => {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) throw new Error('사용자가 로그인되어 있지 않습니다.')

    const res = await fetch('/api/admin/delete-user', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const json = (await res.json().catch(() => null)) as
      | { success: true }
      | { success: false; error?: string }
      | null

    if (!res.ok || !json?.success) {
      Swal.fire({
        text: '회원탈퇴 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return { success: false }
    }

    await supabase.auth.signOut()

    Swal.fire({
      text: '회원탈퇴가 성공적으로 완료되었습니다.',
      icon: 'success',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    })

    return { success: true }
  } catch (error) {
    console.error('사용자 삭제 중 오류:', error)
    return { success: false, error }
  }
}


