import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css' // CSS 파일 임포트
import formatDateFromNumber from '../../utill/formatDateFromNumber'
import { AiOutlineCalendar } from 'react-icons/ai'
import useWindowWidth from '../../hooks/useWindowWidth'
import styled from 'styled-components'
import { formatDateToYYYYMMDD } from '../../utill/formatDateToYYYYMMDD'
import { useAuth } from '../../hooks/useAuth'
import { useCartMutations } from '../../mutations/useCartMutations'
import { checkCartItemReceivingDateById } from '../../config/api/cart/checkCartItemReceivingDate'
import { CartItemType } from '../../types/CartItemType'

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { session } = useAuth()
  const windowWidth = useWindowWidth()
  const { updateCartItemReceivingDateMutation } = useCartMutations()
  const [isReceivingDateExsisted, setIsReceivingDateExsisted] = useState(false)

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

  return (
    <DatePickerCon>
      <DataPickerLabel>
        <DatePickerIcon
          isreceivingdateexsisted={isReceivingDateExsisted}
          isdateselected={isDateSelected}
          datepickertype={type}
        >
          <AiOutlineCalendar />
        </DatePickerIcon>
        <Space />
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
              style={{
                fontSize: windowWidth <= 600 ? '0.8rem' : '0.9rem',
                padding: '4px 4px 6px 4px',
              }}
            />
          }
        />
      </DataPickerLabel>
    </DatePickerCon>
  )
}

const DatePickerCon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const DataPickerLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: rgba(100, 100, 100, 1);
  width: 100%;
`

const Space = styled.div`
  width: 10px;
`

const DatePickerIcon = styled.div<{
  isreceivingdateexsisted: boolean
  isdateselected: boolean | undefined
  datepickertype: string | undefined
}>`
  cursor: pointer;
  color: ${props =>
    props.isdateselected !== undefined
      ? props.isdateselected
        ? 'rgb(18, 202, 147)'
        : 'rgb(223, 33, 19)'
      : props.isreceivingdateexsisted
      ? 'rgb(18, 202, 147)'
      : 'rgb(223, 33, 19)'};

  @media (max-width: 530px) {
    position: ${props =>
      props.datepickertype === 'productDetail' ? 'block' : 'absolute'};
  }

  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`
