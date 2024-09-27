import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/supabaseClient'
import { useState } from 'react'
import Swal from 'sweetalert2'

export const useHandleSignUp = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = async (email: string, password: string) => {
    setErrorMessage('')
    try {
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
          error.message.includes(
            'duplicate key value violates unique constraint'
          )
        ) {
          setErrorMessage('이미 사용중인 이메일입니다.')
        } else if (error.code === 'over_email_send_rate_limit') {
          setErrorMessage(
            'You have exceeded the email sending limit. Please try again later.'
          )
        } else {
          setErrorMessage(error.message)
        }
      } else {
        Swal.fire({
          text: '회원가입이 완료 되었습니다.',
          icon: 'success',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
        navigate('/')
      }
    } catch (err) {
      console.error('회원가입 오류:', err)
      setErrorMessage('회원가입 오류입니다.')
    }
  }

  return { handleSignUp, errorMessage }
}
