'use client'

import Swal from 'sweetalert2'

import CartItem from './Cart/CartItem'
import EmptyCart from './Cart/EmptyCart'
import TotalPriceSection from './Cart/TotalPriceSection'
import Button from '@/components/Common/Button'
import { countCheckItemAmount } from '@/lib/utils/countCheckItemAmount'
import { priceCalculation } from '@/lib/utils/priceCalculation'
import type { CartItemType } from '@/types/CartItemType'

import { CartActionButtons } from './CartActionButtons'

type DeleteCartItemMutation = { mutate: (cartId: string) => void }
type ToggleAllCartItemStatusMutation = {
  mutate: (vars: { cartId: string; allItemChecked: boolean }) => void
}

type Props = {
  userId: string
  items: CartItemType[]
  totalPrice: number
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
  allItemChecked: boolean
  setAllItemChecked: React.Dispatch<React.SetStateAction<boolean>>
  isAllItemReceivingDateSelected: boolean
  deleteCartItemMutation: DeleteCartItemMutation
  toggleAllCartItemStatusMutation: ToggleAllCartItemStatusMutation
  navigate: (to: string) => void
}

export function CartView({
  userId,
  items,
  totalPrice,
  setTotalPrice,
  allItemChecked,
  setAllItemChecked,
  isAllItemReceivingDateSelected,
  deleteCartItemMutation,
  toggleAllCartItemStatusMutation,
  navigate,
}: Props) {
  return (
    <div className="w-full min-h-[calc(100vh-373px)] border-t border-solid border-[rgba(210,210,210,1)] mt-[100px] max-[1980px]:min-h-[calc(100vh-100px)] max-[1024px]:mt-[90px] max-[768px]:mt-[74px] max-[600px]:mt-[52px]">
      <div className="mt-[40px] mx-auto w-[75%] max-[1024px]:w-[90%] max-[1024px]:h-auto max-[1024px]:my-[42px] max-[600px]:w-full max-[600px]:my-[16px] max-[600px]:px-[14px]">
        <div className="mb-[20px] text-[1.4rem] font-[600] max-[1024px]:hidden">
          장바구니
        </div>
        <div className="justify-between items-center p-[10px] mb-[6px] hidden max-[1024px]:flex">
          <div className="flex items-center max-[600px]:text-[0.9rem] [&_input]:w-[18px] [&_input]:h-[18px] [&_input]:mr-[8px] max-[600px]:[&_input]:w-[14px] max-[600px]:[&_input]:h-[14px]">
            <div>
              <input
                type="checkbox"
                checked={allItemChecked}
                onChange={() => {
                  const cartId = userId

                  setAllItemChecked((prev) => {
                    const newValue = !prev
                    toggleAllCartItemStatusMutation.mutate({
                      cartId,
                      allItemChecked: newValue,
                    })
                    return newValue
                  })
                }}
              />
            </div>
            <div>
              전체선택 ({countCheckItemAmount(items)}
              {items.length})
            </div>
          </div>
          <div
            className="cursor-pointer max-[600px]:text-[0.9rem]"
            onClick={() => {
              deleteCartItemMutation.mutate(userId)
            }}
          >
            선택삭제
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="border-t-[3px] border-t-[rgba(30,30,30,1)] border-b border-b-[rgba(120,120,120,1)] border-solid max-[1024px]:border-t-[2px] max-[1024px]:border-t-[rgba(20,20,20,1)] max-[600px]:border-t max-[600px]:border-t-[rgba(20,20,20,1)]">
            <CartItem
              type="header"
              cartId={userId}
              allItemChecked={allItemChecked}
              setAllItemChecked={setAllItemChecked}
            />
            {items.map((cartItem, i) => (
              <CartItem
                key={i}
                title={cartItem.title}
                imgUrl={cartItem.imgUrl}
                price={priceCalculation(cartItem.originalPrice, cartItem.discount)}
                checked={cartItem.checked}
                receivingDate={cartItem.receivingDate}
                setTotalPrice={setTotalPrice}
                cartId={userId}
                itemId={cartItem.itemId}
                quantity={cartItem.quantity}
                deliveryperiod={cartItem.deliveryPeriod}
              />
            ))}
          </div>
        )}

        <div className="flex mt-[20px] justify-between items-center max-[1024px]:flex-col max-[1024px]:items-end max-[1024px]:mt-[15px]">
          {items.length > 0 ? (
            <div className="flex items-center justify-between min-w-[280px] max-[1024px]:hidden">
              <Button
                colortype="white"
                hover={false.toString()}
                onClick={() => deleteCartItemMutation.mutate(userId)}
              >
                선택상품 삭제
              </Button>
              <Button
                colortype="white"
                hover={false.toString()}
                onClick={() => {
                  Swal.fire({
                    text: '품절 상품이 없습니다.',
                    icon: 'warning',
                    confirmButtonColor: '#1E1E1E',
                    confirmButtonText: '확인',
                    scrollbarPadding: false,
                  })
                }}
              >
                품절상품 삭제
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="max-[1024px]:text-[0.9rem] max-[600px]:text-[0.8rem] max-[400px]:text-[0.7rem]">
            선택 가능한 수령일는 제품 배송기간에 따라 달라집니다.
          </div>
        </div>

        <div className="mt-[60px] border border-solid border-[grey] rounded-[8px] overflow-hidden max-[1024px]:mt-[50px] max-[600px]:mt-[30px] max-[600px]:mb-[40px]">
          <TotalPriceSection totalPrice={totalPrice} />
        </div>
        <CartActionButtons
          items={items}
          userId={userId}
          isAllItemReceivingDateSelected={isAllItemReceivingDateSelected}
          deleteCartItemMutation={deleteCartItemMutation}
          navigate={navigate}
        />
      </div>
    </div>
  )
}


