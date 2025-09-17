import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useAuth } from './useAuth'
import { fetchCartItems } from '../config/api/cart/fetchCartItems'
import { QUERY_KEYS } from '../config/constants/queryKeys'

export const useCartState = () => {
  const [cartState, setCartState] = useState(false)
  const { session } = useAuth()
  const queryClient = useQueryClient()

  const { data } = useQuery(
    QUERY_KEYS.CART_ITEMS,
    () => fetchCartItems(session!.user.id),
    {
      enabled: !!session,
    }
  )

  // 로그인 시 cart 데이터 즉시 새로고침
  useEffect(() => {
    if (session?.user.id) {
      queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
    }
  }, [session?.user.id, queryClient])

  // cart 상태 업데이트
  useEffect(() => {
    if (data && data.items && data.items.length > 0) {
      setCartState(true)
    } else {
      setCartState(false)
    }
  }, [data])

  const clearCartState = () => {
    setCartState(false)
    queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
  }

  return {
    cartState,
    clearCartState,
  }
}
