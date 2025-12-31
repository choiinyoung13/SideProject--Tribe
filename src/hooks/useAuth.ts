'use client'
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { Session } from '@supabase/supabase-js'

// 기존 타입을 유지하여 호환성 보장
type AuthState = {
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthActions = {
  signOut: () => Promise<void>
}

export type UseAuthReturn = AuthState & AuthActions

/**
 * 전역 AuthContext를 사용하는 hook
 * 이를 통해 모든 컴포넌트가 동일한 인증 상태를 즉시 공유합니다.
 */
export const useAuth = (): UseAuthReturn => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    // 만약 AuthProvider 밖에서 사용된다면 에러를 던지지 않고 기본값 혹은 warning을 주는 것도 고려할 수 있지만, 
    // 여기서는 일관성을 위해 에러를 던지는 Provider 버전의 useAuth를 래핑합니다.
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
