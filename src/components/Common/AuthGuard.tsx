import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import CircleLoading from './CircleLoading'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean // true: 인증 필요, false: 비인증 필요
}

/**
 * 인증 상태에 따라 컴포넌트를 보호하는 가드 컴포넌트
 * @param children - 보호할 컴포넌트
 * @param redirectTo - 리다이렉트할 경로 (기본값: '/login')
 * @param requireAuth - 인증 필요 여부 (기본값: true)
 */
export const AuthGuard = ({
  children,
  redirectTo = '/login',
  requireAuth = true,
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth()

  // 로딩 중일 때는 로딩 컴포넌트 표시
  if (isLoading) {
    return <CircleLoading />
  }

  // 인증이 필요한 경우: 인증되지 않으면 리다이렉트
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // 인증이 필요하지 않은 경우: 인증되었으면 리다이렉트 (로그인 페이지 등)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
