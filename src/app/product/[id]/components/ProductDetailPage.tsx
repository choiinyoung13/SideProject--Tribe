'use client'

import { useEffect, useState } from 'react'

import ImageSection from './ProductDetail/ImageSection'
import TextSection from './ProductDetail/TextSection'
import type { ItemType } from '@/types/ItemType'

type Props = {
  productInfo: ItemType
}

export default function ProductDetailPage({ productInfo }: Props) {
  const [isDateSelected, setIsDateSelected] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="pt-[100px] pb-20 max-[1024px]:pt-[90px] max-[768px]:pt-[74px] max-[600px]:pt-[60px]">
      <div className="flex items-start justify-center w-[85%] mx-auto max-[1550px]:items-start max-[1024px]:w-full max-[1024px]:px-4 max-[768px]:px-4 max-[600px]:px-4">
        <div className="flex items-start justify-center w-full gap-8 max-[1024px]:flex-col max-[1024px]:gap-6">
          <ImageSection image={productInfo.imgurl} />
          <TextSection
            isDateSelected={isDateSelected}
            setIsDateSelected={setIsDateSelected}
            productInfo={productInfo}
          />
        </div>
      </div>
    </div>
  )
}
