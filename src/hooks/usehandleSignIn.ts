import { supabase } from '../supabase/supabaseClient'
import { useState } from 'react'

export const useHandleSignIn = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn = async (email: string, password: string) => {
    setErrorMessage('')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
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

  return { handleSignIn, errorMessage }
}
