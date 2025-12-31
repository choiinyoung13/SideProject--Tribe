'use client'

import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css' // CSS 파일 임포트
import formatDateFromNumber from '@/lib/utils/formatDateFromNumber'
import { AiOutlineCalendar } from 'react-icons/ai'
import { formatDateToYYYYMMDD } from '@/lib/utils/formatDateToYYYYMMDD'
import { useAuth } from '@/hooks/useAuth'
import { useCartMutations } from '@/features/cart/mutations/useCartMutations'
import { checkCartItemReceivingDateById } from '@/lib/cart/checkCartItemReceivingDateById'
import { CartItemType } from '@/types/CartItemType'

interface FutureDatePickerProps {
  daysOffset: number
  setIsDateSelected?: React.Dispatch<React.SetStateAction<boolean>>
  setOrderInfo?: React.Dispatch<React.SetStateAction<CartItemType>>
  receivingDate: number
  itemId?: number
  isDateSelected?: boolean
  type?: string
}

export default function FutureDatePicker({
  daysOffset,
  setIsDateSelected,
  setOrderInfo,
  receivingDate,
  itemId,
  isDateSelected,
  type,
}: FutureDatePickerProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { session } = useAuth()
  const { updateCartItemReceivingDateMutation } = useCartMutations()
  const [isReceivingDateExsisted, setIsReceivingDateExsisted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (session && itemId) {
      const checkReceivingDate = async () => {
        const res = await checkCartItemReceivingDateById({
          cartId: session.user.id,
          itemId,
        })

        if (res) {
          setIsReceivingDateExsisted(res)
        }
      }

      checkReceivingDate()
    }
  }, [itemId, receivingDate, session])

  const handleDateChange = (date: Date | null) => {
    if (date && session && itemId) {
      updateCartItemReceivingDateMutation.mutate({
        cartId: session?.user.id,
        itemId: itemId,
        newReceivingDate: Number(formatDateToYYYYMMDD(date)),
      })
    }
    setSelectedDate(date)
    if (setOrderInfo)
      setOrderInfo(prev => ({
        ...prev,
        receivingDate: Number(formatDateToYYYYMMDD(date!)),
      }))
    if (setIsDateSelected) setIsDateSelected(true)
  }

  const calculateMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + daysOffset)
    return today
  }

  const iconColor =
    isDateSelected !== undefined
      ? isDateSelected
        ? 'rgb(18, 202, 147)'
        : 'rgb(223, 33, 19)'
      : isReceivingDateExsisted
        ? 'rgb(18, 202, 147)'
        : 'rgb(223, 33, 19)'



  // react-datepicker는 SSR 환경에서 hydration mismatch를 유발할 수 있어
  // 최초 렌더(서버 + 클라이언트 hydration)에서는 동일한 마크업만 렌더하고,
  // 마운트 이후에만 DatePicker를 렌더합니다.
  if (!mounted) {
    return (
      <div className="flex items-center w-full">
        <label className="flex items-center justify-center text-[1.4rem] text-[rgba(100,100,100,1)] w-full">
          <div
            className="cursor-pointer max-[500px]:text-[1.3rem]"
            style={{ color: iconColor }}
          >
            <AiOutlineCalendar />
          </div>
          <div className="w-[10px]" />
          <input
            className={`dp-full-width ${type}`}
            style={{ padding: '4px 4px 6px 4px' }}
            value={receivingDate !== 0 ? formatDateFromNumber(receivingDate) : ''}
            placeholder={'수령일을 선택해주세요'}
            readOnly
          />
        </label>
      </div>
    )
  }

  return (
    <div className="flex items-center w-full">
      <label className="flex items-center justify-center text-[1.4rem] text-[rgba(100,100,100,1)] w-full">
        <div
          className="cursor-pointer max-[500px]:text-[1.3rem]"
          style={{ color: iconColor }}
        >
          <AiOutlineCalendar />
        </div>
        <div className="w-[10px]" />
        <DatePicker
          wrapperClassName="dp-full-width-wrapper"
          className={`dp-full-width ${type}`}
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={calculateMinDate()}
          dateFormat="yyyy-MM-dd"
          value={receivingDate !== 0 ? formatDateFromNumber(receivingDate) : ''}
          placeholderText={'수령일을 선택해주세요'}
          customInput={
            <input
              style={{ padding: '4px 4px 6px 4px' }}
            />
          }
        />
      </label>
    </div>
  )
}

