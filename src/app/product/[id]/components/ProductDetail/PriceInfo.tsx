import formatNumberWithCommas from '@/lib/utils/formatNumberWithCommas'
import { priceCalculation } from '@/lib/utils/priceCalculation'

interface PriceInfoPropsType {
  originalprice: number
  discount: number
}

export default function PriceInfo({
  originalprice,
  discount,
}: PriceInfoPropsType) {
  return (
    <div className="flex items-center gap-3 mb-6 max-[1024px]:mb-5 max-[600px]:mb-4 flex-wrap">
      <div className="text-[2.6rem] font-[600] text-[rgb(223,33,19)] max-[1980px]:text-[1.6rem] max-[1024px]:text-[1.6rem] max-[600px]:text-[1.3rem]">
        {formatNumberWithCommas(priceCalculation(originalprice, discount))}원
      </div>
      <div className="line-through decoration-[rgba(120,120,120,1)] text-[rgba(120,120,120,1)] text-[1.5rem] max-[1980px]:text-[1rem] max-[600px]:text-[0.9rem]">
        {formatNumberWithCommas(originalprice)}원
      </div>
      <div className="bg-[rgb(223,33,19)] text-white text-sm font-semibold px-2 py-1 rounded">
        {discount}% OFF
      </div>
    </div>
  )
}

