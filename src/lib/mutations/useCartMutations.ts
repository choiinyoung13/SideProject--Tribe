import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import {
  deleteCheckedCartItems,
  deleteAllCartItems,
} from '@/lib/cart/deleteCartItem'
import {
  toggleAllCartItemStatus,
  toggleCartItemStatus,
} from '@/lib/cart/toggleCartItemStatus'
import { updateCartItemQuantity } from '@/lib/cart/updateCartItemQuantity'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'
import { hasCheckedItemsInCart } from '@/lib/cart/hasCheckedItemsInCart'
import { addItemToCart } from '@/lib/cart/addItemToCart'
import { updateCartItemReceivingDate } from '@/lib/cart/updateCartItemReceivingDate'
import { CartItemTypeWithUserId } from '@/types/CartItemType'
import type { FetchShopItemsResponse } from '@/app/shop/lib/types'
import { useNavigate } from '@/shared/routing/navigation'

export function useCartMutations() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  /******* deleteCartItemMutation  ********/
  const deleteCartItemMutation = useMutation({
    mutationFn: (cartId: string) => deleteCheckedCartItems(cartId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
    },
  })

  /******* deleteAllCartItemMutation  ********/
  const deleteAllCartItemMutation = useMutation({
    mutationFn: (cartId: string) => deleteAllCartItems(cartId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
    },
  })

  /******* toggleAllCartItemStatusMutation  ********/
  const toggleAllCartItemStatusMutation = useMutation({
    mutationFn: ({
      cartId,
      allItemChecked,
    }: {
      cartId: string
      allItemChecked: boolean
    }) => toggleAllCartItemStatus({ cartId, allItemChecked }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
    },
  })

  /******* caartItemQuantityMutation  ********/
  const cartItemQuantityMutation = useMutation({
    mutationFn: ({
      cartId,
      itemId,
      direction,
    }: {
      cartId: string
      itemId: number
      direction: string
    }) => updateCartItemQuantity({ cartId, itemId, direction }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
    },
  })

  /******* toggleCartItemStatusMutation  ********/
  const toggleCartItemStatusMutation = useMutation({
    mutationFn: ({ cartId, itemId }: { cartId: string; itemId: number }) =>
      toggleCartItemStatus({ cartId, itemId }),
    onSuccess: async (_data, variables) => {
      const { cartId } = variables
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART_ITEMS })

      const res = await hasCheckedItemsInCart(cartId)
      return res
    },
  })

  const addItemToCartMutation = useMutation({
    mutationFn: ({
      userId,
      title,
      imgUrl,
      originalPrice,
      discount,
      checked,
      receivingDate,
      itemId,
      quantity,
      deliveryPeriod,
    }: CartItemTypeWithUserId) =>
      addItemToCart({
        userId,
        title,
        imgUrl,
        originalPrice,
        discount,
        checked,
        receivingDate,
        itemId,
        quantity,
        deliveryPeriod,
      }),
    onMutate: async variables => {
      const { itemId } = variables

      // 낙관적 업데이트: 모든 shop items 쿼리의 캐시를 업데이트
      queryClient.setQueriesData<InfiniteData<FetchShopItemsResponse>>(
        { queryKey: ['items'] },
        oldData => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              items: page.items.map(item =>
                item.id === itemId ? { ...item, isInCart: true } : item
              ),
            })),
          }
        }
      )

      // 롤백을 위한 이전 데이터 저장
      return { previousData: queryClient.getQueriesData({ queryKey: ['items'] }) }
    },
    onError: (error, _variables, context) => {
      console.error('Error updating item:', error)

      // 에러 발생 시 롤백
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
      // shop items 쿼리도 최종적으로 invalidate하여 서버 데이터와 동기화
      await queryClient.invalidateQueries({ queryKey: ['items'] })
      
      const path = window.location.pathname
      const hasProduct = path.includes('/product')

      if (hasProduct) {
        // 상품페이지에서 장바구니 추가를 했다면 성공 후 shop 페이지로 redirect
        navigate('/shop')
      }
    },
  })

  const updateCartItemReceivingDateMutation = useMutation({
    mutationFn: ({
      cartId,
      itemId,
      newReceivingDate,
    }: {
      cartId: string
      itemId: number
      newReceivingDate: number
    }) => updateCartItemReceivingDate({ cartId, itemId, newReceivingDate }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
    },
  })

  return {
    deleteCartItemMutation,
    deleteAllCartItemMutation,
    toggleAllCartItemStatusMutation,
    cartItemQuantityMutation,
    toggleCartItemStatusMutation,
    addItemToCartMutation,
    updateCartItemReceivingDateMutation,
  }
}
