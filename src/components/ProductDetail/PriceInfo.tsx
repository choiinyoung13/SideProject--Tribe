import styled from "styled-components";

interface PriceInfoProps {
  formatNumberWithCommas: (num: number) => string;
}

export default function PriceInfo({ formatNumberWithCommas }: PriceInfoProps) {
  return (
    <PriceCon>
      <DiscountedPrice>{formatNumberWithCommas(9900)}원</DiscountedPrice>
      <DiscountInfo>
        <Discount>{28}%</Discount>
        <OriginalPrice>{formatNumberWithCommas(13900)}원</OriginalPrice>
      </DiscountInfo>
    </PriceCon>
  );
}

const PriceCon = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 6px;
`;

const DiscountInfo = styled.div`
  display: flex;
  margin-left: 10px;

  @media (max-width: 1024px) {
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
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 6px;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;
