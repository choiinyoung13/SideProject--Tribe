'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * react-router-dom의 `useNavigate()`와 유사한 API를 제공하는 어댑터.
 * - string: router.push
 * - number: history 이동(back/forward)
 */
export function useNavigate() {
  const router = useRouter()

  return useCallback(
    (to: string | number) => {
      if (typeof to === 'number') {
        // react-router의 navigate(-1) 등의 패턴 대응
        if (to < 0) router.back()
        else router.forward()
        return
      }

      router.push(to)
    },
    [router]
  )
}


