import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import Swal from 'sweetalert2'

export const useHandleSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = async (email: string, password: string) => {
    setErrorMessage('')

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          user_name: null,
          avatar_url: null,
        },
      },
    })

    if (error) {
      if (
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        setErrorMessage('이미 사용중인 이메일입니다.')
      } else {
        setErrorMessage(error.message)
      }
      return { success: false, error }
    }

    return { success: true }
  }

  // 인증번호 확인하기
  const verifyOtpCode = async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: 'email',
      })

      if (error) {
        return { success: false, error }
      }

      return { success: true }
    } catch (error) {
      console.error('인증번호 확인 중 오류 발생:', error)
      return { success: false }
    }
  }

  return { handleSignUp, verifyOtpCode, errorMessage }
}
