import { supabase } from '@/supabase/supabaseClient'

// 비밀번호 변경 함수
export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: oldPassword,
    })

    if (signInError) {
      console.error('기존 비밀번호가 틀렸습니다.', signInError.message)
      return { success: false, message: '기존 비밀번호가 올바르지 않습니다.' }
    }

    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updatePasswordError) {
      console.error('비밀번호 변경 실패:', updatePasswordError.message)
      return { success: false, message: '비밀번호 변경에 실패했습니다.' }
    }

    return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' }
  } catch (error) {
    console.error('비밀번호 변경 중 오류가 발생했습니다:', error)
    return { success: false, message: '비밀번호 변경 중 오류가 발생했습니다.' }
  }
}


