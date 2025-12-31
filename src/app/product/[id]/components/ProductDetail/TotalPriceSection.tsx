import React, { useState } from 'react'
import { Truck, Flower } from 'lucide-react'

import CountButton from '@/components/Common/CountButton'
import formatNumberWithCommas from '@/lib/utils/formatNumberWithCommas'
import { priceCalculation } from '@/lib/utils/priceCalculation'
import { SHIPPING_COST } from '@/shared/constants/shipping'
import { CartItemType } from '@/types/CartItemType'

interface TotalPriceSectionProps {
  title: string
  originalprice: number
  discount: number
  setOrderInfo: React.Dispatch<React.SetStateAction<CartItemType>>
}

export default function TotalPriceSection({
  title,
  originalprice,
  discount,
  setOrderInfo,
}: TotalPriceSectionProps) {
  const [count, setCount] = useState(1)

  return (
    <div className="my-[40px] max-[1024px]:my-[35px] max-[600px]:my-[35px]">
      <section className="w-full bg-gray-50 rounded-lg border border-[rgba(240,240,240,1)] p-5">
        <section className="flex items-center gap-2 mb-4">
          <Flower size={20} className="text-[#1d1d1d] shrink-0" />
          <h3 className="text-[1.3rem] font-[500] text-[#1d1d1d] max-[1980px]:text-[1.1rem] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]">
            주문 정보
          </h3>
        </section>
        <section className="flex items-center justify-between w-full border-b border-solid border-[rgba(220,220,220,1)] rounded-lg pb-3">
          <div className="text-[rgba(60,60,60,1)] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]">
            {title}
          </div>
          <div>
            <CountButton
              type={'productDetail'}
              cartId={''}
              itemId={0}
              quantity={1}
              setCount={setCount}
              count={count}
              setOrderInfo={setOrderInfo}
            />
          </div>
        </section>
        <section className="border-t border-[rgba(240,240,240,1)] mt-4 py-2">
          <div className="flex justify-between pb-3 border-b border-[rgba(240,240,240,1)] text-[rgba(60,60,60,1)] font-[500] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]">
            <div>총 상품금액</div>
            <div>
              {formatNumberWithCommas(
                priceCalculation(originalprice, discount) * count
              )}
              원
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 text-[rgba(60,60,60,1)] font-[500] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-[rgba(60,60,60,1)]" />
              <span>배송비</span>
            </div>
            <div>{formatNumberWithCommas(SHIPPING_COST)}원</div>
          </div>
        </section>
        <section className="flex justify-between items-center pt-3 mt-4 border-t border-solid border-[rgba(220,220,220,1)]">
          <div className="text-[rgba(60,60,60,1)] font-bold text-lg max-[1024px]:text-[1rem] max-[600px]:text-[0.9rem]">
            총 결제금액
          </div>
          <div className="text-[rgba(60,60,60,1)] font-bold text-2xl max-[1024px]:text-xl max-[600px]:text-lg">
            {formatNumberWithCommas(
              priceCalculation(originalprice, discount) * count + SHIPPING_COST
            )}
            원
          </div>
        </section>
      </section>
    </div>
  )
}
