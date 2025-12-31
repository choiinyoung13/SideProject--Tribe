'use client'

import { useEffect, useState } from 'react'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import { useNavigate } from '@/shared/routing/navigation'
import { priceCalculation } from '@/lib/utils/priceCalculation'
import { useCartMutations } from '@/lib/mutations/useCartMutations'
import { fetchCartItems } from '@/lib/cart/fetchCartItems'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'
import { CartItemType } from '@/types/CartItemType'
import { CartView } from './CartView'

interface CartItemsResponse {
    items: CartItemType[]
}

type Props = {
    userId: string
    initialItems: CartItemType[]
}

export default function CartClient({ userId, initialItems }: Props) {
    const navigate = useNavigate()
    const [totalPrice, setTotalPrice] = useState(0)
    const [allItemChecked, setAllItemChecked] = useState(false)
    const [isAllItemReceivingDateSelected, setIsAllItemReceivingDateSelected] =
        useState(false)

    const { deleteCartItemMutation, toggleAllCartItemStatusMutation } =
        useCartMutations()

    const { data: cartData }: UseQueryResult<CartItemsResponse> = useQuery({
        queryKey: QUERY_KEYS.CART_ITEMS,
        queryFn: () => fetchCartItems(userId),
        initialData: { items: initialItems },
        staleTime: Infinity,
        gcTime: 30 * 60 * 1000,
    })

    useEffect(() => {
        const currentItems = cartData?.items ?? initialItems
        if (currentItems && currentItems.length > 0) {
            const isAllItemSelected = currentItems.every(item => item.checked)
            setAllItemChecked(isAllItemSelected)

            const isAllCheckedItemReceivingDateSelected = currentItems
                .filter(item => item.checked)
                .every((item: CartItemType) => item.receivingDate !== 0)

            setIsAllItemReceivingDateSelected(isAllCheckedItemReceivingDateSelected)

            const total = currentItems
                .filter(item => item.checked)
                .reduce(
                    (sum, item) =>
                        sum +
                        priceCalculation(item.originalPrice, item.discount) * item.quantity,
                    0
                )
            setTotalPrice(total)
        } else {
            setAllItemChecked(false)
            setIsAllItemReceivingDateSelected(false)
            setTotalPrice(0)
        }
    }, [cartData, initialItems, setTotalPrice])

    return (
        <CartView
            userId={userId}
            items={cartData?.items ?? initialItems}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            allItemChecked={allItemChecked}
            setAllItemChecked={setAllItemChecked}
            isAllItemReceivingDateSelected={isAllItemReceivingDateSelected}
            deleteCartItemMutation={deleteCartItemMutation}
            toggleAllCartItemStatusMutation={toggleAllCartItemStatusMutation}
            navigate={navigate}
        />
    )
}
