import { supabase } from '../../../supabase/supabaseClient'

// 비밀번호 변경 함수
export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    // 기존 비밀번호로 다시 로그인 (재인증)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: oldPassword,
    })

    // 만약 기존 비밀번호가 틀리면 에러 반환
    if (signInError) {
      console.error('기존 비밀번호가 틀렸습니다.', signInError.message)
      return { success: false, message: '기존 비밀번호가 올바르지 않습니다.' }
    }

    // 비밀번호가 일치하면 새로운 비밀번호로 업데이트
    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updatePasswordError) {
      console.error('비밀번호 변경 실패:', updatePasswordError.message)
      return { success: false, message: '비밀번호 변경에 실패했습니다.' }
    }

    // 비밀번호 변경 성공
    return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' }
  } catch (error) {
    console.error('비밀번호 변경 중 오류가 발생했습니다:', error)
    return { success: false, message: '비밀번호 변경 중 오류가 발생했습니다.' }
  }
}
