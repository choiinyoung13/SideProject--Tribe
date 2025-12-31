'use client'

import Swal from 'sweetalert2'

import { addPurchaseHistory } from '@/lib/cart/addPurchaseHistory'
import { priceCalculation } from '@/lib/utils/priceCalculation'
import type { CartItemType } from '@/types/CartItemType'

type DeleteCartItemMutation = { mutate: (cartId: string) => void }

type Props = {
  items: CartItemType[]
  userId: string
  isAllItemReceivingDateSelected: boolean
  deleteCartItemMutation: DeleteCartItemMutation
  navigate: (to: string) => void
}

export function CartActionButtons({
  items,
  userId,
  isAllItemReceivingDateSelected,
  deleteCartItemMutation,
  navigate,
}: Props) {
  return (
    <div className="flex justify-end mt-[50px] pb-[50px] max-[1024px]:mt-[20px] max-[1024px]:pb-0 max-[600px]:mt-[10px] max-[600px]:flex-col max-[600px]:items-center">
      <button
        className="p-[16px] text-[1.1rem] font-[500] cursor-pointer w-[260px] rounded-[6px] bg-white border border-solid border-[rgba(150,150,150,1)] max-[600px]:w-full max-[600px]:p-[12px] max-[600px]:text-[0.9rem] max-[600px]:mb-[10px]"
        onClick={() => {
          navigate('/shop')
        }}
      >
        {items.length > 0 ? '계속 쇼핑하기' : '쇼핑하러 가기'}
      </button>

      {items.length > 0 && items.some((item) => item.checked) ? (
        isAllItemReceivingDateSelected ? (
          <button
            className="p-[16px] text-[1.1rem] font-[500] cursor-pointer w-[260px] rounded-[6px] bg-[rgba(20,20,20,1)] text-white border-0 ml-[14px] max-[600px]:w-full max-[600px]:p-[12px] max-[600px]:text-[0.9rem] max-[600px]:ml-0"
            onClick={() => {
              Swal.fire({
                text: '구매해주셔서 감사합니다.',
                icon: 'success',
                confirmButtonColor: '#1E1E1E',
                confirmButtonText: '확인',
                scrollbarPadding: false,
                allowOutsideClick: false,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const checkedItems = items.filter((item) => item.checked)
                  const purchaseDataArray = checkedItems.map((item) => ({
                    id: item.itemId,
                    img_url: item.imgUrl,
                    title: item.title,
                    price:
                      priceCalculation(item.originalPrice, item.discount) *
                      item.quantity,
                    amount: item.quantity,
                    created_at: new Date().toISOString(),
                  }))

                  for (const purchaseData of purchaseDataArray) {
                    await addPurchaseHistory(userId, purchaseData)
                  }

                  deleteCartItemMutation.mutate(userId)
                  navigate('/shop')
                }
              })
            }}
          >
            결제하기
          </button>
        ) : (
          <button className="p-[16px] text-[1.1rem] font-[500] cursor-pointer w-[260px] rounded-[6px] bg-[rgba(20,20,20,1)] text-white border-0 ml-[14px] max-[600px]:w-full max-[600px]:p-[12px] max-[600px]:text-[0.9rem] max-[600px]:ml-0">
            수령일을 선택해주세요
          </button>
        )
      ) : (
        <button className="p-[16px] text-[1.1rem] font-[500] cursor-pointer w-[260px] rounded-[6px] bg-[rgba(20,20,20,1)] text-white border-0 ml-[14px] max-[600px]:w-full max-[600px]:p-[12px] max-[600px]:text-[0.9rem] max-[600px]:ml-0">
          상품을 선택해주세요
        </button>
      )}
    </div>
  )
}


