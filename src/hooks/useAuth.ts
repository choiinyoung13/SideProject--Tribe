import { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { Session } from '@supabase/supabase-js'

// 표준화된 인증 상태 타입
type AuthState = {
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthActions = {
  signOut: () => Promise<void>
}

export type UseAuthReturn = AuthState & AuthActions

export const useAuth = (): UseAuthReturn => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error getting session:', error.message)
      } else {
        setSession(data.session)
      }
      setIsLoading(false)
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

  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    signOut,
  }
}
