import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CountButton from '../Common/CountButton'
import formatNumberWithCommas from '../../utill/formatNumberWithCommas'
import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import {
  toggleCartAllItemStatus,
  toggleCartItemStatus,
} from '../../utill/cart/toggleCartItemStatus'
import { hasCheckedItemsInCart } from '../../utill/cart/hasCheckedItemsInCart '

interface ToggleCartItemStatusArgs {
  cartId: string
  itemId: number
}

interface CartItemPropsType {
  type?: string
  title?: string
  imgUrl?: string
  price?: number
  option?: string
  receivingDate?: number
  checked?: boolean
  setTotalPrice?: React.Dispatch<React.SetStateAction<number>>
  cartId?: string
  itemId?: number
  mutation?: UseMutationResult<void, unknown, ToggleCartItemStatusArgs>
  setForceReRender?: React.Dispatch<React.SetStateAction<boolean>>
  allItemChecked?: boolean
  setAllItemChecked?: React.Dispatch<React.SetStateAction<boolean>>
  handleItemCheckedChange?: (itemId: number, checked: boolean) => void
}

export default function CartItem({
  type,
  title,
  imgUrl,
  price,
  option,
  receivingDate,
  checked,
  setTotalPrice,
  cartId,
  itemId,
  setForceReRender,
  allItemChecked,
  setAllItemChecked,
  handleItemCheckedChange,
}: CartItemPropsType) {
  const [productCount, setProductCount] = useState(1)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (price && setTotalPrice) {
      setTotalPrice(prev => prev + price * productCount)
    }

    return () => {
      if (price && setTotalPrice) {
        setTotalPrice(prev => prev - price * productCount)
      }
    }
  }, [productCount, price, setTotalPrice])

  const cartItemMutation = useMutation(
    ({ cartId, itemId }: { cartId: string; itemId: number }) =>
      toggleCartItemStatus({ cartId, itemId }),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(import.meta.env.VITE_CART_ITEM_QUERY_KEY)
          .then(async () => {
            if (!cartId) return
            const res = await hasCheckedItemsInCart(cartId)
            if (res && setAllItemChecked) {
              setAllItemChecked(false)
            }
          })
          .then(() => {
            console.log(allItemChecked)
            if (setForceReRender) setForceReRender(prev => !prev)
          })
      },
    }
  )

  const allCartItemMutation = useMutation(
    ({ cartId, allItemChecked }: { cartId: string; allItemChecked: boolean }) =>
      toggleCartAllItemStatus({ cartId, allItemChecked }),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(import.meta.env.VITE_CART_ITEM_QUERY_KEY)
          .then(() => {
            if (setForceReRender) setForceReRender(prev => !prev)
          })
      },
    }
  )

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
                  allCartItemMutation.mutate({
                    cartId,
                    allItemChecked: newValue,
                  })
                  return newValue
                })
              }}
            />
          </CheckBox>
          <ProductInfo className="header">상품정보</ProductInfo>
          <Amount className="header">수량</Amount>
          <OrderPrice className="header">주문금액</OrderPrice>
          <ReceivingDate className="header">수령일</ReceivingDate>
        </ItemContent>
      </ItemContentCon>
    )
  } else if (
    title &&
    imgUrl &&
    price &&
    option &&
    cartId &&
    itemId &&
    setForceReRender
  ) {
    return (
      <ItemContentCon>
        <ItemContent>
          <CheckBox>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                cartItemMutation.mutate({ cartId, itemId })
                if (handleItemCheckedChange) {
                  handleItemCheckedChange(itemId, !checked)
                }
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
              <ProductTextOption>추가상품: {option}</ProductTextOption>
            </ProductText>
          </ProductInfo>
          <Amount>
            <CountButton
              type={'cart'}
              productCount={productCount}
              setProductCount={setProductCount}
            />
          </Amount>
          <OrderPrice>
            {formatNumberWithCommas(price * productCount)}원
          </OrderPrice>
          <ReceivingDate>{receivingDate}</ReceivingDate>
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

  @media (max-width: 1024px) {
    margin-left: 10px;
  }

  @media (max-width: 600px) {
    margin-left: 0;
  }
`
const ProductTextTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3em;
  line-height: 1.5em;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin-bottom: 7px;
  }

  @media (max-width: 414px) {
    font-size: 0.7rem;
    margin-bottom: 7px;
  }
`
const ProductTextPrice = styled.div`
  font-size: 0.9rem;
  margin-bottom: 12px;
  padding-left: 3px;
  color: rgba(130, 130, 130, 1);

  @media (max-width: 600px) {
    font-size: 0.7rem;
    margin-bottom: 7px;
  }
`
const ProductTextOption = styled.div`
  font-size: 0.9rem;
  padding-left: 2px;
  color: rgba(130, 130, 130, 1);

  @media (max-width: 600px) {
    font-size: 0.7rem;
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
    border-right: none;
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
  border-right: 1px solid rgba(160, 160, 160, 0.5);
  padding: 14px;
  font-size: 1.2rem;
  font-weight: 500;

  @media (max-width: 1024px) {
    padding: 10px;
    border-right: none;
    font-size: 1.1rem;
  }

  @media (max-width: 600px) {
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

  @media (max-width: 1024px) {
    display: none;
  }
`
