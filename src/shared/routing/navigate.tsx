'use client'

import { useEffect } from 'react'
import { useNavigate } from './navigation'

/**
 * react-router-dom의 `<Navigate />` 대체.
 * 기존 AuthGuard 같은 곳에서 `return <Navigate to="..." replace />` 패턴을 유지하기 위한 컴포넌트.
 */
export function Navigate({ to }: { to: string; replace?: boolean }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to)
  }, [navigate, to])

  return null
}


