import { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { Session } from '@supabase/supabase-js'

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error getting session:', error.message)
      } else {
        setSession(data.session)
      }
      setIsLoading(false) // 세션 확인 후 로딩 상태 변경
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      setSession(null)
    }
  }

  return { session, signOut, isLoading } // isLoading 상태 반환
}
