import { useEffect, useState } from 'react'
import CountButton from '@/components/Common/CountButton'
import formatNumberWithCommas from '@/lib/utils/formatNumberWithCommas'
import type { UseMutationResult } from '@tanstack/react-query'
import { useCartMutations } from '@/features/cart/mutations/useCartMutations'
import FutureDatePicker from '@/components/Common/DatePicker'

interface ToggleCartItemStatusArgs {
  cartId: string
  itemId: number
}

interface CartItemPropsType {
  type?: string
  title?: string
  imgUrl?: string
  price?: number
  receivingDate?: number
  checked?: boolean
  setTotalPrice?: React.Dispatch<React.SetStateAction<number>>
  cartId?: string
  itemId?: number
  mutation?: UseMutationResult<void, unknown, ToggleCartItemStatusArgs>
  allItemChecked?: boolean
  setAllItemChecked?: React.Dispatch<React.SetStateAction<boolean>>
  quantity?: number
  deliveryperiod?: number
}

export default function CartItem({
  type,
  title,
  imgUrl,
  price,
  receivingDate,
  checked,
  setTotalPrice,
  cartId,
  itemId,
  allItemChecked,
  setAllItemChecked,
  quantity,
  deliveryperiod,
}: CartItemPropsType) {
  const { toggleCartItemStatusMutation, toggleAllCartItemStatusMutation } =
    useCartMutations()
  const [isDateSelected, setIsDateSelected] = useState(false)

  useEffect(() => {
    if (receivingDate === 0) {
      setIsDateSelected(false)
    } else {
      setIsDateSelected(true)
    }
  }, [receivingDate])

  useEffect(() => {
    if (checked && price && quantity && setTotalPrice) {
      setTotalPrice(prev => (prev + price) * quantity)
    }

    return () => {
      if (checked && price && quantity && setTotalPrice) {
        setTotalPrice(prev => prev - price * quantity)
      }
    }
  }, [checked, price, quantity, setTotalPrice])

  if (type === 'header' && cartId && setAllItemChecked) {
    return (
      <div className="max-[1024px]:hidden max-[600px]:text-[0.8rem]">
        <div className="flex border-t border-b border-solid border-[rgba(160,160,160,0.5)] first:border-b-0">
          <div className="flex justify-center items-center flex-grow-0 basis-0% px-[14px] py-[14px] pl-[20px]">
            <input
              type="checkbox"
              checked={allItemChecked}
              onChange={() => {
                setAllItemChecked(prev => {
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
          <div className="flex justify-center items-center flex-[18] basis-1/2 px-[18px] py-[18px] font-[500] text-[1.1rem] max-[600px]:text-[0.9rem]">
            상품정보
          </div>
          <div className="flex justify-center items-center flex-[3] basis-[17%] px-[14px] py-[14px] font-[500] text-[1.1rem] min-w-[173px] max-[600px]:text-[0.9rem]">
            수령일
            <span className="text-[rgb(223,33,19)] text-[1rem]">* (필수)</span>
          </div>
          <div className="flex justify-center items-center flex-[3] basis-[15%] px-[14px] py-[14px] font-[500] text-[1.1rem] max-[600px]:text-[0.9rem]">
            수량
          </div>
          <div className="flex justify-center items-center flex-[3] basis-[15%] px-[14px] py-[14px] font-[500] text-[1.1rem] min-w-[120px] max-[600px]:text-[0.9rem]">
            주문금액
          </div>
        </div>
      </div>
    )
  } else if (
    title &&
    imgUrl &&
    price &&
    cartId &&
    itemId &&
    quantity &&
    deliveryperiod &&
    receivingDate != undefined
  ) {
    return (
      <div className="max-[600px]:text-[0.8rem]">
        <div className="flex border-t border-b border-solid border-[rgba(160,160,160,0.5)] max-[1024px]:items-center max-[1024px]:relative">
          <div className="flex justify-center items-center flex-grow-0 basis-0% px-[14px] py-[14px] pl-[20px] max-[1024px]:p-[10px] max-[1024px]:absolute max-[1024px]:top-[2px] max-[600px]:p-[9px] [&_input]:w-[20px] [&_input]:h-[20px] max-[600px]:[&_input]:w-[15px] max-[600px]:[&_input]:h-[15px]">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                toggleCartItemStatusMutation.mutate({ cartId, itemId })
              }}
            />
          </div>
          <div className="flex justify-center items-center flex-[18] basis-1/2 border-r border-solid border-[rgba(160,160,160,0.5)] p-[18px] max-[1024px]:p-[10px] max-[1024px]:border-r-0 max-[600px]:p-[8px] max-[600px]:items-center">
            <div className="flex-[1] basis-[15%]">
              <img
                className="w-full min-w-[80px] rounded-[6px] max-[1024px]:min-w-[100px] max-[600px]:min-w-[70px]"
                src={imgUrl}
                alt=""
              />
            </div>
            <div className="flex-[7] basis-[85%] ml-[20px] flex flex-col justify-center max-[1024px]:ml-[14px] max-[600px]:ml-[10px]">
              <div className="text-[1.2rem] font-[500] mb-[10px] [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis max-[1500px]:text-[1.1rem] max-[1500px]:mb-[8px] max-[768px]:text-[1rem] max-[768px]:mb-[7px] max-[600px]:text-[0.8rem] max-[600px]:mb-[7px]">
                {title}
              </div>
              <div className="text-[1.1rem] pl-[3px] text-[rgba(130,130,130,1)] max-[1500px]:text-[1rem] max-[1024px]:text-[0.95rem] max-[600px]:text-[0.8rem]">
                {formatNumberWithCommas(price)}원
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-[3] basis-[17%] p-[14px] text-[1.1rem] font-[400] min-w-[173px] border-r border-solid border-[rgba(160,160,160,0.5)] max-[1024px]:border-0 max-[600px]:flex-[2] max-[600px]:basis-[30%] max-[600px]:min-w-[40px] max-[530px]:flex-[1] max-[530px]:basis-[22%] max-[530px]:min-w-[40px]">
            <div className="flex justify-center items-center w-[90%]">
              <FutureDatePicker
                daysOffset={deliveryperiod}
                receivingDate={receivingDate}
                itemId={itemId}
                type={'cartItem'}
                isDateSelected={isDateSelected}
                setIsDateSelected={setIsDateSelected}
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-[3] basis-[15%] border-r border-solid border-[rgba(160,160,160,0.5)] p-[14px] max-[1024px]:p-[10px] max-[1024px]:border-0 max-[600px]:p-[8px] max-[600px]:basis-auto">
            <CountButton
              type={'cart'}
              cartId={cartId}
              itemId={itemId}
              quantity={quantity}
              count={0}
            />
          </div>
          <div className="flex justify-center items-center flex-[3] basis-[15%] p-[14px] text-[1.2rem] font-[500] min-w-[120px] max-[1024px]:p-[10px] max-[1024px]:text-[1.1rem] max-[768px]:hidden">
            {formatNumberWithCommas(price * quantity)}원
          </div>
        </div>
      </div>
    )
  }

  return null
}

// (Tailwind 마이그레이션 완료)

