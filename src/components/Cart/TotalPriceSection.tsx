import styled from 'styled-components'
import formatNumberWithCommas from '../../utill/formatNumberWithCommas'
import { FaPlus } from 'react-icons/fa6'
import { PiEqualsBold } from 'react-icons/pi'
import useWindowWidth from '../../hooks/useWindowWidth'
import { useRef } from 'react'

export default function TotalPriceSection({
  totalPrice,
  cartItems,
}: {
  totalPrice: number
  cartItems: object[]
}) {
  const windowWidth = useWindowWidth()
  const deliveryPrice = useRef(3000)

  return (
    <>
      <ItemContentCon>
        {windowWidth < 600 ? (
          <MobileTotalPriceSection>
            <MobileTotalOrderPrice>
              <div>총 주문금액</div>
              <span>
                {cartItems.length > 0 ? formatNumberWithCommas(totalPrice) : 0}
                원
              </span>
            </MobileTotalOrderPrice>
            <MobileDeliveryPrice>
              <div>배송비</div>
              <span>
                {cartItems.length > 0
                  ? formatNumberWithCommas(deliveryPrice.current)
                  : 0}
                원
              </span>
            </MobileDeliveryPrice>
            <hr />
            <MobileTotalPrice>
              <div>총 결제금액</div>
              <span>
                {cartItems.length > 0
                  ? formatNumberWithCommas(totalPrice + deliveryPrice.current)
                  : 0}
                원
              </span>
            </MobileTotalPrice>
          </MobileTotalPriceSection>
        ) : (
          <>
            <ItemContent>
              <TotalOrderPrice className="header">총 주문금액</TotalOrderPrice>
              <DeliveryPrice className="header">배송비</DeliveryPrice>
              <TotalPrice className="header">총 결제금액</TotalPrice>
            </ItemContent>
            <ItemContent>
              <TotalOrderPrice className="body">
                {cartItems.length > 0 ? formatNumberWithCommas(totalPrice) : 0}
                원
                <PlusIcon>
                  <FaPlus />
                </PlusIcon>
              </TotalOrderPrice>
              <DeliveryPrice className="body">
                {cartItems.length > 0
                  ? formatNumberWithCommas(deliveryPrice.current)
                  : 0}
                원
                <EqualIcon>
                  <PiEqualsBold />
                </EqualIcon>
              </DeliveryPrice>
              <TotalPrice className="body">
                {cartItems.length > 0
                  ? formatNumberWithCommas(totalPrice + deliveryPrice.current)
                  : 0}
                원
              </TotalPrice>
            </ItemContent>
          </>
        )}
      </ItemContentCon>
    </>
  )
}

const ItemContentCon = styled.div`
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`

const ItemContent = styled.div`
  display: flex;
  padding: 20px;

  &:first-of-type {
    border-bottom: 1px solid rgba(160, 160, 160, 0.5);
  }

  @media (max-width: 1024px) {
    padding: 15px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
`

const TotalOrderPrice = styled.div`
  flex-grow: 1;
  flex-basis: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;

  &.body {
    position: relative;
    font-size: 1.5rem;
    padding: 14px 0;

    @media (max-width: 1024px) {
      font-size: 1.3rem;
      padding: 10px 0;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`
const DeliveryPrice = styled.div`
  flex-grow: 1;
  flex-basis: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;

  &.body {
    position: relative;
    font-size: 1.5rem;

    @media (max-width: 1024px) {
      font-size: 1.3rem;
      padding: 10px 0;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`
const TotalPrice = styled.div`
  flex-grow: 1;
  flex-basis: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;

  &.body {
    position: relative;
    font-size: 1.5rem;

    @media (max-width: 1024px) {
      font-size: 1.3rem;
      padding: 10px 0;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`

const PlusIcon = styled.div`
  position: absolute;
  right: 0;
  background-color: rgba(20, 20, 20, 1);
  color: #fff;
  width: 31px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.3rem;

  @media (max-width: 1024px) {
    width: 27px;
    height: 27px;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

const EqualIcon = styled.div`
  position: absolute;
  right: 0;
  background-color: rgba(20, 20, 20, 1);
  color: #fff;
  width: 31px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.3rem;

  @media (max-width: 1024px) {
    width: 27px;
    height: 27px;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

const MobileTotalPriceSection = styled.div`
  padding: 10px 12px;
`

const MobileTotalOrderPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin-top: 6px;
  margin-bottom: 18px;

  span {
    font-weight: 500;
  }
`
const MobileDeliveryPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 18px;

  span {
    font-weight: 500;
  }
`
const MobileTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin-top: 14px;
  margin-bottom: 8px;

  span {
    font-weight: 500;
  }
`
