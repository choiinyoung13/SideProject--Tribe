import styled from "styled-components";
import formatNumberWithCommas from "../../utill/formatNumberWithCommas";
import { priceCalculation } from "../../utill/priceCalculation";

interface PriceInfoPropsType {
  originalprice: number;
  discount: number;
}

export default function PriceInfo({
  originalprice,
  discount,
}: PriceInfoPropsType) {
  return (
    <PriceCon>
      <DiscountedPrice>
        {formatNumberWithCommas(priceCalculation(originalprice, discount))}원
      </DiscountedPrice>
      <DiscountInfo>
        <Discount>{discount}%</Discount>
        <OriginalPrice>{formatNumberWithCommas(originalprice)}원</OriginalPrice>
      </DiscountInfo>
    </PriceCon>
  );
}

const PriceCon = styled.div`
  display: flex;
  align-items: end;
`;

const DiscountInfo = styled.div`
  display: flex;
  margin-left: 10px;
  font-size: 1.5rem;

  @media (max-width: 1980px) {
    margin-left: 7px;
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    margin-left: 7px;
    font-size: 0.9rem;
  }
`;

const Discount = styled.div`
  color: rgb(223, 33, 19);
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  text-decoration-color: rgba(120, 120, 120, 1);
  color: rgba(120, 120, 120, 1);
  margin-left: 6px;
`;

const DiscountedPrice = styled.div`
  font-size: 2.6rem;
  font-weight: 600;
  margin-top: 6px;

  @media (max-width: 1980px) {
    font-size: 1.6rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;
