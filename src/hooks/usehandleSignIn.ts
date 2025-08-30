import { supabase } from '../supabase/supabaseClient'
import { useState } from 'react'
import { makeUserCart } from '../config/api/cart/makeUserCart'
import { Provider } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const useHandleSignIn = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn = async (email: string, password: string) => {
    setErrorMessage('')

    // 먼저 이메일로 계정이 존재하는지 확인
    const { data: userExistsData, error: userExistsError } = await supabase
      .from('userinfo') // Supabase의 사용자 테이블(예: 'users')
      .select('email')
      .eq('email', email)
      .single()

    // 가입된 계정이 없는 경우
    if (userExistsError || !userExistsData) {
      Swal.fire({
        text: '가입된 계정이 아닙니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return { success: false, error: userExistsError }
    }

    try {
      // 계정이 존재하면 비밀번호 확인
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      // 비밀번호가 틀린 경우 에러 반환
      if (error) {
        Swal.fire({
          text: '올바른 비밀번호가 아닙니다.',
          icon: 'warning',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
        console.error(error)
        return { success: false, error }
      }

      // 로그인 성공 시 홈으로 이동
      navigate('/')
      return { success: true }
    } catch (err) {
      console.error('로그인 중 오류 발생:', err)
      setErrorMessage(
        '예기치 않은 오류가 발생했습니다. 나중에 다시 시도해주세요.'
      )
      return { success: false, error: { message: 'Unexpected error occurred' } }
    }
  }

  // 소셜 로그인 설정
  const signInWithOAuth = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: 'https://tribe-beige.vercel.app',
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    })

    if (error) {
      console.error(`OAuth 로그인 중 오류 발생 (${provider}):`, error)
      setErrorMessage(`OAuth 로그인 중 오류가 발생했습니다 (${provider}).`)
    }
  }

  // 로그인 후 유저 장바구니 정보를 불러오는 작업
  const handleAuthRedirect = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('세션을 불러오는 중 오류 발생:', error)
      setErrorMessage('세션을 불러오는 중 오류가 발생했습니다.')
      return
    }

    if (data?.session?.user?.id) {
      await makeUserCart(data.session.user.id)
    }
  }

  return {
    handleSignIn,
    signInWithOAuth,
    handleAuthRedirect,
    errorMessage,
  }
}
