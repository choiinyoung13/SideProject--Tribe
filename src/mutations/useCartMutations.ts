import { useMutation, useQueryClient } from 'react-query'
import {
  deleteAllCartItem,
  deleteCartItem,
} from '../config/api/cart/deleteCartItem'
import {
  toggleAllCartItemStatus,
  toggleCartItemStatus,
} from '../config/api/cart/toggleCartItemStatus'
import { updateCartItemQuantity } from '../config/api/cart/updateCartItemQuantity'
import { QUERY_KEYS } from '../config/constants/queryKeys'
import { hasCheckedItemsInCart } from '../config/api/cart/hasCheckedItemsInCart '
import { addItemToCart } from '../config/api/cart/addItemToCart'
import { updateCartItemReceivingDate } from '../config/api/cart/updateCartItemReceivingDate'
import { CartItemTypeWithUserId } from '../types/CartItemType'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export function useCartMutations() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  /******* deleteCartItemMutation  ********/
  const deleteCartItemMutation = useMutation(
    (cartId: string) => deleteCartItem(cartId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
      },
    }
  )

  /******* deleteAllCartItemMutation  ********/
  const deleteAllCartItemMutation = useMutation(
    (cartId: string) => deleteAllCartItem(cartId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
      },
    }
  )

  /******* toggleAllCartItemStatusMutation  ********/
  const toggleAllCartItemStatusMutation = useMutation(
    ({ cartId, allItemChecked }: { cartId: string; allItemChecked: boolean }) =>
      toggleAllCartItemStatus({ cartId, allItemChecked }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS).then(() => {})
      },
    }
  )

  /******* caartItemQuantityMutation  ********/
  const cartItemQuantityMutation = useMutation(
    ({
      cartId,
      itemId,
      direction,
    }: {
      cartId: string
      itemId: number
      direction: string
    }) => updateCartItemQuantity({ cartId, itemId, direction }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
      },
    }
  )

  /******* toggleCartItemStatusMutation  ********/
  const toggleCartItemStatusMutation = useMutation(
    ({ cartId, itemId }: { cartId: string; itemId: number }) =>
      toggleCartItemStatus({ cartId, itemId }),
    {
      onSuccess: async (_data, variables) => {
        const { cartId } = variables
        await queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)

        const res = await hasCheckedItemsInCart(cartId)
        return res
      },
    }
  )

  const addItemToCartMutation = useMutation(
    ({
      userId,
      title,
      imgUrl,
      originalPrice,
      discount,
      option,
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
        option,
        checked,
        receivingDate,
        itemId,
        quantity,
        deliveryPeriod,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
        Swal.fire({
          text: '장바구니에 추가되었습니다.',
          icon: 'success',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
      },
      onError: error => {
        console.error('Error updating item:', error)
      },
    }
  )

  const updateCartItemReceivingDateMutation = useMutation(
    ({
      cartId,
      itemId,
      newReceivingDate,
    }: {
      cartId: string
      itemId: number
      newReceivingDate: number
    }) => updateCartItemReceivingDate({ cartId, itemId, newReceivingDate }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
      },
    }
  )

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
