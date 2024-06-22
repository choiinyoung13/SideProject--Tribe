import React, { useState } from "react";
import styled from "styled-components";
import CountButton from "../Common/CountButton";
import formatNumberWithCommas from "../../utill/formatNumberWithCommas";
import { priceCalculation } from "../../utill/priceCalculation";
import { SHIPPING_COST } from "../../config/constants";

interface OrderInfo {
  itemId: number;
  quantity: number;
  receivingDate: number;
  option: string;
  checked: boolean;
}

interface TotalPriceSectionProps {
  additionalOptionsPrice: number;
  originalprice: number;
  discount: number;
  setOrderInfo: React.Dispatch<React.SetStateAction<OrderInfo>>;
}

export default function TotalPriceSection({
  additionalOptionsPrice,
  originalprice,
  discount,
  setOrderInfo,
}: TotalPriceSectionProps) {
  const [count, setCount] = useState(1);

  return (
    <TotalPriceCon>
      <TotalPriceTitle>주문정보</TotalPriceTitle>
      <PriceInfoBox>
        <MainProductPrice>
          <MainProduct>용기가 필요할 땐, 푸에고 장미</MainProduct>
          <div>
            <CountButton
              type={"productDetail"}
              cartId={""}
              itemId={0}
              quantity={1}
              setCount={setCount}
              count={count}
              setOrderInfo={setOrderInfo}
            />
          </div>
        </MainProductPrice>
        <div></div>
        <DeliveryPriceText>
          <div>배송비</div>
          <div>{formatNumberWithCommas(SHIPPING_COST)}원</div>
        </DeliveryPriceText>
        <TotalPriceText>
          <div>총 주문금액</div>
          <div>
            {formatNumberWithCommas(
              priceCalculation(originalprice, discount) * count +
                SHIPPING_COST +
                additionalOptionsPrice
            )}
            원
          </div>
        </TotalPriceText>
      </PriceInfoBox>
    </TotalPriceCon>
  );
}

const TotalPriceCon = styled.div``;

const TotalPriceTitle = styled.span`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const DeliveryPriceText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  padding: 0px 4px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }
`;

const TotalPriceText = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 0px 4px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }
`;

const PriceInfoBox = styled.div`
  width: 100%;
  background-color: rgba(240, 240, 240, 1);
  padding: 20px 14px 26px;
`;

const MainProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 10px;
`;

const MainProduct = styled.div`
  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;
