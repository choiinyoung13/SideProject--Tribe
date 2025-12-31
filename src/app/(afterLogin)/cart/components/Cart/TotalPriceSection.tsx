import formatNumberWithCommas from '@/lib/utils/formatNumberWithCommas'
import { FaPlus } from 'react-icons/fa6'
import { PiEqualsBold } from 'react-icons/pi'
import { SHIPPING_COST } from '@/shared/constants/shipping'

export default function TotalPriceSection({
  totalPrice,
}: {
  totalPrice: number
}) {
  return (
    <div className="max-[600px]:text-[0.8rem]">
      {/* mobile */}
      <div className="px-[12px] py-[10px] max-[600px]:block hidden">
        <div className="flex justify-between items-center text-[1rem] mt-[6px] mb-[18px] [&_span]:font-[500]">
          <div>총 주문금액</div>
          <span>{formatNumberWithCommas(totalPrice)}원</span>
        </div>
        <div className="flex justify-between items-center text-[1rem] mb-[18px] [&_span]:font-[500]">
          <div>배송비</div>
          <span>{formatNumberWithCommas(SHIPPING_COST)}원</span>
        </div>
        <hr />
        <div className="flex justify-between items-center text-[1rem] mt-[14px] mb-[8px] [&_span]:font-[500]">
          <div>총 결제금액</div>
          <span>{formatNumberWithCommas(totalPrice + SHIPPING_COST)}원</span>
        </div>
      </div>

      {/* desktop/tablet */}
      <div className="max-[600px]:hidden block">
        <div className="flex p-[20px] max-[1024px]:p-[15px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:p-[10px] border-b border-solid border-b-[rgba(160,160,160,0.5)]">
          <div className="flex-1 basis-1/3 flex justify-center items-center text-[1.1rem] font-[500]">
            총 주문금액
          </div>
          <div className="flex-1 basis-1/3 flex justify-center items-center text-[1.1rem] font-[500]">
            배송비
          </div>
          <div className="flex-1 basis-1/3 flex justify-center items-center text-[1.1rem] font-[500]">
            총 결제금액
          </div>
        </div>
        <div className="flex p-[20px] max-[1024px]:p-[15px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:p-[10px]">
          <div className="flex-1 basis-1/3 flex justify-center items-center text-[1.5rem] font-[500] relative py-[14px] max-[1024px]:text-[1.3rem] max-[1024px]:py-[10px] max-[768px]:text-[1.2rem] max-[600px]:text-[1.2rem]">
            {formatNumberWithCommas(totalPrice)}원
            <div className="absolute right-0 bg-[rgba(20,20,20,1)] text-white w-[31px] h-[31px] flex justify-center items-center rounded-full text-[1.3rem] max-[1024px]:w-[27px] max-[1024px]:h-[27px] max-[1024px]:text-[1.1rem] max-[768px]:w-[26px] max-[768px]:h-[26px] max-[768px]:text-[1rem] max-[600px]:hidden">
              <FaPlus />
            </div>
          </div>
          <div className="flex-1 basis-1/3 flex justify-center items-center text-[1.5rem] font-[500] relative max-[1024px]:text-[1.3rem] max-[1024px]:py-[10px] max-[768px]:text-[1.2rem] max-[600px]:text-[1.2rem]">
            {formatNumberWithCommas(SHIPPING_COST)}원
            <div className="absolute right-0 bg-[rgba(20,20,20,1)] text-white w-[31px] h-[31px] flex justify-center items-center rounded-full text-[1.3rem] max-[1024px]:w-[27px] max-[1024px]:h-[27px] max-[1024px]:text-[1.1rem] max-[768px]:w-[26px] max-[768px]:h-[26px] max-[768px]:text-[1rem] max-[600px]:hidden">
              <PiEqualsBold />
            </div>
          </div>
          <div className="flex-1 basis-1/3 flex justify-center items-center text-[1.5rem] font-[500] relative max-[1024px]:text-[1.3rem] max-[1024px]:py-[10px] max-[768px]:text-[1.2rem] max-[600px]:text-[1.2rem]">
            {formatNumberWithCommas(totalPrice + SHIPPING_COST)}원
          </div>
        </div>
      </div>
    </div>
  )
}

