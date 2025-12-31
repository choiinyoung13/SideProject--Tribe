import React from 'react'
import FutureDatePicker from '@/components/Common/DatePicker'
import { CartItemType } from '@/types/CartItemType'

interface DatePickerSectionProps {
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>
  setOrderInfo: React.Dispatch<React.SetStateAction<CartItemType>>
  deliveryperiod: number
  isDateSelected: boolean
  receivingDate: number
}

export default function DatePickerSection({
  setIsDateSelected,
  setOrderInfo,
  deliveryperiod,
  isDateSelected,
  receivingDate,
}: DatePickerSectionProps) {
  return (
    <div className="my-[40px] w-full max-[1024px]:mt-[36px] max-[1024px]:mb-[35px] max-[600px]:my-[35px]">
      <div className="text-[1.3rem] font-[500] w-full max-[1980px]:text-[1.1rem] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]">
        수령일
        <span className="text-[rgb(223,33,19)] text-[1rem] font-[400] max-[1024px]:text-[0.8rem] max-[600px]:text-[0.8rem]">
          * (필수)
        </span>
      </div>
      <div className="mt-[10px] w-full">
        <FutureDatePicker
          daysOffset={deliveryperiod}
          setIsDateSelected={setIsDateSelected}
          setOrderInfo={setOrderInfo}
          isDateSelected={isDateSelected}
          type={'productDetail'}
          receivingDate={receivingDate}
        />
      </div>
    </div>
  )
}

