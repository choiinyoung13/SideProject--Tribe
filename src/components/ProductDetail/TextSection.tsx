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
  width: 50%;
  padding: 26px 0px 26px 60px;
  border-left: 1px solid rgba(50, 50, 50, 1);
  margin-left: 60px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 40px;
    border-left: none;
    margin-left: 0px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 20px;
    border-left: none;
  }
`
