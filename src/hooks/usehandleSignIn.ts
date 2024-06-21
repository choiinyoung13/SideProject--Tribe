import { supabase } from '../supabase/supabaseClient'
import { useState } from 'react'
import { makeUserCart } from '../utill/cart/makeUserCart'

export const useHandleSignIn = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn = async (email: string, password: string) => {
    setErrorMessage('')
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        console.error(error)
      }
    } catch (err) {
      console.error('Sign up error:', err)
      setErrorMessage('An unexpected error occurred. Please try again later.')
    }
  }

  const signInWithOAuth = async (provider: any) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    })

    if (error) {
      console.error(`Error signing in with ${provider}:`, error)
      setErrorMessage(`Error signing in with ${provider}`)
    }
  }

  const handleAuthRedirect = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Error retrieving session:', error)
      setErrorMessage('Error retrieving session')
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
