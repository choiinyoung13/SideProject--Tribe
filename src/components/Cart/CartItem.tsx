import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CountButton from '../Common/CountButton'
import formatNumberWithCommas from '../../utill/formatNumberWithCommas'
import { UseMutationResult } from 'react-query'
import { useCartMutations } from '../../mutations/useCartMutations'
import FutureDatePicker from '../Common/DatePicker'
import { optionToPrice } from '../../utill/optionToPrice'

interface ToggleCartItemStatusArgs {
  cartId: string
  itemId: number
}

interface CartItemPropsType {
  type?: string
  title?: string
  imgUrl?: string
  price?: number
  receivingDate?: number
  checked?: boolean
  setTotalPrice?: React.Dispatch<React.SetStateAction<number>>
  cartId?: string
  itemId?: number
  mutation?: UseMutationResult<void, unknown, ToggleCartItemStatusArgs>
  allItemChecked?: boolean
  setAllItemChecked?: React.Dispatch<React.SetStateAction<boolean>>
  quantity?: number
  deliveryperiod?: number
}

export default function CartItem({
  type,
  title,
  imgUrl,
  price,
  receivingDate,
  checked,
  setTotalPrice,
  cartId,
  itemId,
  allItemChecked,
  setAllItemChecked,
  quantity,
  deliveryperiod,
}: CartItemPropsType) {
  const { toggleCartItemStatusMutation, toggleAllCartItemStatusMutation } =
    useCartMutations()
  const [isDateSelected, setIsDateSelected] = useState(false)

  useEffect(() => {
    if (receivingDate === 0) {
      setIsDateSelected(false)
    } else {
      setIsDateSelected(true)
    }
  }, [receivingDate])

  useEffect(() => {
    if (price && quantity && setTotalPrice) {
      setTotalPrice(prev => (prev + price) * quantity)
    }

    return () => {
      if (price && quantity && setTotalPrice) {
        setTotalPrice(prev => prev - price * quantity)
      }
    }
  }, [quantity])

  if (type === 'header' && cartId && setAllItemChecked) {
    return (
      <ItemContentCon className="header">
        <ItemContent>
          <CheckBox className="header">
            <input
              type="checkbox"
              checked={allItemChecked}
              onClick={() => {
                setAllItemChecked(prev => {
                  const newValue = !prev
                  toggleAllCartItemStatusMutation.mutate({
                    cartId,
                    allItemChecked: newValue,
                  })
                  return newValue
                })
              }}
            />
          </CheckBox>
          <ProductInfo className="header">상품정보</ProductInfo>
          <ReceivingDate className="header">
            수령일 <Required>* (필수)</Required>
          </ReceivingDate>
          <Amount className="header">수량</Amount>
          <OrderPrice className="header">주문금액</OrderPrice>
        </ItemContent>
      </ItemContentCon>
    )
  } else if (
    title &&
    imgUrl &&
    price &&
    cartId &&
    itemId &&
    quantity &&
    deliveryperiod &&
    receivingDate != undefined
  ) {
    return (
      <ItemContentCon>
        <ItemContent>
          <CheckBox>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                toggleCartItemStatusMutation.mutate({ cartId, itemId })
              }}
            />
          </CheckBox>
          <ProductInfo>
            <ProductImg>
              <img src={imgUrl} alt="" />
            </ProductImg>
            <ProductText>
              <ProductTextTitle>{title}</ProductTextTitle>
              <ProductTextPrice>
                {formatNumberWithCommas(price)}원
              </ProductTextPrice>
            </ProductText>
          </ProductInfo>
          <ReceivingDate>
            <DatePicker>
              <FutureDatePicker
                daysOffset={deliveryperiod}
                receivingDate={receivingDate}
                itemId={itemId}
                type={'cartItem'}
                isDateSelected={isDateSelected}
                setIsDateSelected={setIsDateSelected}
              />
            </DatePicker>
          </ReceivingDate>
          <Amount>
            <CountButton
              type={'cart'}
              cartId={cartId}
              itemId={itemId}
              quantity={quantity}
              count={0}
            />
          </Amount>
          <OrderPrice>{formatNumberWithCommas(price * quantity)}원</OrderPrice>
        </ItemContent>
      </ItemContentCon>
    )
  }

  return null
}

const ItemContentCon = styled.div`
  @media (max-width: 1024px) {
    &.header {
      display: none;
    }
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`

const ItemContent = styled.div`
  display: flex;
  border-top: 1px solid rgba(160, 160, 160, 0.5);
  border-bottom: 1px solid rgba(160, 160, 160, 0.5);

  &:first-of-type {
    border-bottom: none;

    .header {
      font-weight: 500;
      font-size: 1.1rem;
      border-right: none;

      @media (max-width: 600px) {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 1024px) {
    align-items: center;
    position: relative;
  }
`

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-basis: 0%;
  padding: 14px 14px 14px 20px;

  input {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 1024px) {
    padding: 10px;
    position: absolute;
    top: 2px;
  }

  @media (max-width: 600px) {
    padding: 9px;

    input {
      width: 15px;
      height: 15px;
    }
  }
`

const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 18;
  flex-basis: 50%;
  border-right: 1px solid rgba(160, 160, 160, 0.5);
  padding: 18px;

  @media (max-width: 1024px) {
    padding: 10px;
    border-right: none;
  }

  @media (max-width: 600px) {
    padding: 8px;
    align-items: center;
  }
`
const ProductImg = styled.div`
  flex-grow: 1;
  flex-basis: 15%;

  img {
    width: 100%;
    min-width: 80px;
    border-radius: 6px;
  }

  @media (max-width: 1024px) {
    img {
      width: 100%;
      min-width: 100px;
    }
  }

  @media (max-width: 600px) {
    margin-right: 10px;

    img {
      width: 100%;
      min-width: 70px;
    }
  }
`

const ProductText = styled.div`
  flex-grow: 7;
  flex-basis: 85%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    margin-left: 14px;
  }

  @media (max-width: 600px) {
    margin-left: 0;
  }
`
const ProductTextTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1500px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 7px;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin-bottom: 7px;
  }
`
const ProductTextPrice = styled.div`
  font-size: 1.1rem;
  padding-left: 3px;
  color: rgba(130, 130, 130, 1);

  @media (max-width: 1500px) {
    font-size: 1rem;
  }

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`

const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  flex-basis: 15%;
  border-right: 1px solid rgba(160, 160, 160, 0.5);
  padding: 14px;

  @media (max-width: 1024px) {
    padding: 10px;
    border: none;
  }

  @media (max-width: 600px) {
    padding: 8px;
    flex-basis: auto;
  }
`
const OrderPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  flex-basis: 15%;
  padding: 14px;
  font-size: 1.2rem;
  font-weight: 500;
  min-width: 120px;

  @media (max-width: 1024px) {
    padding: 10px;
    border-right: none;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`
const ReceivingDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  flex-basis: 17%;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: 400;
  min-width: 173px;
  border-right: 1px solid rgba(160, 160, 160, 0.5);

  @media (max-width: 1024px) {
    border: none;
  }

  @media (max-width: 600px) {
    flex-grow: 2;
    flex-basis: 30%;
    min-width: 40px;
  }

  @media (max-width: 530px) {
    flex-grow: 1;
    flex-basis: 22%;
    min-width: 40px;
  }
`

const DatePicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`

const Required = styled.span`
  color: rgb(223, 33, 19);
  font-size: 1rem;
`
