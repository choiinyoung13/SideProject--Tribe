import { createClient } from '@supabase/supabase-js'
import { supabase } from '../../../supabase/supabaseClient'
import Swal from 'sweetalert2'

export const deleteUser = async () => {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('사용자가 로그인되어 있지 않습니다.')
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseRoleKey = import.meta.env.VITE_SUPABASE_SURVICE_ROLE_KEY
    const adminSupabase = createClient(supabaseUrl, supabaseRoleKey)

    // 1. 사용자 탈퇴 로직 (사용자 데이터 삭제 처리)
    const { error: deleteUserError } =
      await adminSupabase.auth.admin.deleteUser(user.id)
    if (deleteUserError) {
      Swal.fire({
        text: '회원탈퇴 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return { success: false }
    }

    // 2. carts 테이블에서 해당 사용자의 데이터 삭제
    const { error: deleteCartsError } = await supabase
      .from('carts')
      .delete()
      .eq('user_id', user.id)

    if (deleteCartsError) {
      console.error(
        'carts 테이블에서 데이터 삭제 중 오류 발생:',
        deleteCartsError.message
      )
    }

    // 3. posts 테이블에서 해당 사용자의 데이터 삭제
    const { error: deletePostsError } = await supabase
      .from('posts')
      .delete()
      .eq('user', user.id)

    if (deletePostsError) {
      console.error(
        'posts 테이블에서 데이터 삭제 중 오류 발생:',
        deletePostsError.message
      )
    }

    // 4. userinfo 테이블에서 해당 사용자의 데이터 삭제
    const { error: deleteUserInfoError } = await supabase
      .from('userinfo')
      .delete()
      .eq('id', user.id)

    if (deleteUserInfoError) {
      console.error(
        'userinfo 테이블에서 데이터 삭제 중 오류 발생:',
        deleteUserInfoError.message
      )
    }

    // 5. 로그아웃 처리
    await supabase.auth.signOut()

    // 회원 탈퇴 완료 메시지
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
