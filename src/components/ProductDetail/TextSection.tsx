import React from 'react'
import styled from 'styled-components'
import PriceInfo from '../../components/ProductDetail/PriceInfo'
import ProductInfo from '../../components/ProductDetail/ProductInfo'
import DatePickerSection from '../../components/ProductDetail/DatePickerSection'
import OptionsSection from '../../components/ProductDetail/OptionSection'
import TotalPriceSection from '../../components/ProductDetail/TotalPriceSection'
import ButtonSection from '../../components/ProductDetail/ButtonSection'

type BadgeType = 'hot' | 'fast'

interface TextSectionProps {
  productCount: number
  setProductCount: React.Dispatch<React.SetStateAction<number>>
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

export default function TextSection({
  productCount,
  setProductCount,
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
      <DatePickerSection setIsDateSelected={setIsDateSelected} />
      <OptionsSection handleSelectChange={handleSelectChange} />
      <TotalPriceSection
        productCount={productCount}
        additionalOptionsPrice={additionalOptionsPrice}
        setProductCount={setProductCount}
        originalprice={originalprice}
        discount={discount}
      />
      <ButtonSection isDateSelected={isDateSelected} />
    </TextSectionCon>
  )
}

const TextSectionCon = styled.section`
  width: 40%;
  min-width: 500px;
  padding: 30px 0px 0px 60px;
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
