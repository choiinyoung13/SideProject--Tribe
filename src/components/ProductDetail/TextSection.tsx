import React, { useState } from 'react'
import styled from 'styled-components'
import PriceInfo from '../../components/ProductDetail/PriceInfo'
import ProductInfo from '../../components/ProductDetail/ProductInfo'
import DatePickerSection from '../../components/ProductDetail/DatePickerSection'
import OptionsSection from '../../components/ProductDetail/OptionSection'
import TotalPriceSection from '../../components/ProductDetail/TotalPriceSection'
import ButtonSection from '../../components/ProductDetail/ButtonSection'

type BadgeType = 'hot' | 'fast'

interface TextSectionProps {
  additionalOptionsPrice: number
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
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

interface OrderInfo {
  itemId: number
  quantity: number
  receivingDate: number
  option: string
  checked: boolean
}

export default function TextSection({
  additionalOptionsPrice,
  handleSelectChange,
  isDateSelected,
  setIsDateSelected,
  productInfo,
}: TextSectionProps) {
  const {
    title,
    originalprice,
    discount,
    size,
    origin,
    classification,
    deliveryperiod,
  } = productInfo
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    itemId: productInfo.id,
    quantity: 1,
    receivingDate: 0,
    option: '',
    checked: false,
  })

  return (
    <TextSectionCon>
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
      />
      <OptionsSection
        handleSelectChange={handleSelectChange}
        setOrderInfo={setOrderInfo}
      />
      <TotalPriceSection
        additionalOptionsPrice={additionalOptionsPrice}
        originalprice={originalprice}
        discount={discount}
        setOrderInfo={setOrderInfo}
      />
      <ButtonSection isDateSelected={isDateSelected} orderInfo={orderInfo} />
    </TextSectionCon>
  )
}

const TextSectionCon = styled.section`
  width: 41%;
  min-width: 520px;
  padding: 14px 0px 0px 60px;
  border-left: 1px solid rgba(150, 150, 150, 1);

  @media (max-width: 1024px) {
    width: 100%;
    min-width: 100%;
    padding: 30px;
    border-left: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    padding: 20px;
    border-left: none;
  }
`
