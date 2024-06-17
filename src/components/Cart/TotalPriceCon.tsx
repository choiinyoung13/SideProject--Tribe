import styled from "styled-components";
import formatNumberWithCommas from "../../utill/formatNumberWithCommas";
import { FaPlus } from "react-icons/fa6";
import { PiEqualsBold } from "react-icons/pi";

export default function TotalPriceCon() {
  return (
    <>
      <ItemContentCon>
        <ItemContent>
          <TotalOrderPrice className="header">총 주문금액</TotalOrderPrice>
          <DeliveryPrice className="header">배송비</DeliveryPrice>
          <TotalPrice className="header">총 결제금액</TotalPrice>
        </ItemContent>
        <ItemContent>
          <TotalOrderPrice className="body">
            {formatNumberWithCommas(49000)}원
            <PlusIcon>
              <FaPlus />
            </PlusIcon>
          </TotalOrderPrice>
          <DeliveryPrice className="body">
            {formatNumberWithCommas(3000)}원
            <EqualIcon>
              <PiEqualsBold />
            </EqualIcon>
          </DeliveryPrice>
          <TotalPrice className="body">
            {formatNumberWithCommas(52000)}원
          </TotalPrice>
        </ItemContent>
      </ItemContentCon>
    </>
  );
}

const ItemContentCon = styled.div``;

const ItemContent = styled.div`
  display: flex;
  padding: 20px;

  &:first-of-type {
    border-bottom: 1px solid rgba(160, 160, 160, 0.5);
  }
`;

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
  }
`;
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
  }
`;
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
  }
`;

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
`;

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
`;
