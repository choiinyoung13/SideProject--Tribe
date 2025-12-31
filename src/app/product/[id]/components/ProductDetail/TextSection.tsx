import React, { useState } from 'react'
import PriceInfo from './PriceInfo'
import ProductInfo from './ProductInfo'
import DatePickerSection from './DatePickerSection'
import OptionsSection from './OptionSection'
import TotalPriceSection from './TotalPriceSection'
import ButtonSection from './ButtonSection'
import { CartItemType } from '@/types/CartItemType'

type BadgeType = 'hot' | 'fast'

interface TextSectionProps {
  isDateSelected: boolean
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>
  productInfo: {
    id: number
    title: string
    imgurl: string
    originalprice: number
    badge: BadgeType[]
    discount: number
    category: string
    size: string
    origin: string
    classification: string
    deliveryperiod: number
  }
}

export default function TextSection({
  isDateSelected,
  setIsDateSelected,
  productInfo,
}: TextSectionProps) {
  const {
    title,
    imgurl,
    originalprice,
    discount,
    size,
    origin,
    classification,
    deliveryperiod,
  } = productInfo
  const [orderInfo, setOrderInfo] = useState<CartItemType>({
    itemId: productInfo.id,
    title: title,
    imgUrl: imgurl,
    originalPrice: originalprice,
    discount: discount,
    checked: false,
    receivingDate: 0,
    quantity: 1,
    deliveryPeriod: deliveryperiod,
  })

  return (
    <section className="w-1/2 border-l border-[rgba(50,50,50,1)] pl-[80px] max-[1980px]:pl-[60px] max-[1024px]:w-full max-[1024px]:border-l-0 max-[1024px]:pl-0 max-[600px]:w-full">
      <div className="text-[1.8rem] font-[500] mb-[14px] max-[1980px]:text-[1.5rem] max-[1024px]:text-[1.4rem] max-[600px]:text-[1.2rem]">
        {title}
      </div>
      <PriceInfo originalprice={originalprice} discount={discount} />
      <ProductInfo
        title={title}
        size={size}
        classification={classification}
        deliveryPeriod={deliveryperiod}
        origin={origin}
      />
      <DatePickerSection
        setIsDateSelected={setIsDateSelected}
        setOrderInfo={setOrderInfo}
        deliveryperiod={deliveryperiod}
        isDateSelected={isDateSelected}
        receivingDate={orderInfo.receivingDate}
      />
      <OptionsSection />
      <TotalPriceSection
        title={title}
        originalprice={originalprice}
        discount={discount}
        setOrderInfo={setOrderInfo}
      />
      <ButtonSection isDateSelected={isDateSelected} orderInfo={orderInfo} />
    </section>
  )
}
