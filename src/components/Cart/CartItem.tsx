import { useState } from "react";
import styled from "styled-components";
import product_img from "../../assets/images/shop_item/item_1.jpg";
import CountButton from "../../components/common/CountButton";
import formatNumberWithCommas from "../../utill/formatNumberWithCommas";

interface CartItemPropsType {
  type?: string;
  title?: string;
  price?: number;
  option?: string;
  receivingDate?: string;
}

export default function CartItem({
  type,
  title,
  price,
  option,
  receivingDate,
}: CartItemPropsType) {
  const [productCount, setProductCount] = useState(1);
  if (type === "header") {
    return (
      <ItemContentCon>
        <ItemContent>
          <CheckBox className="header">
            <input type="checkbox" />
          </CheckBox>
          <ProductInfo className="header">상품정보</ProductInfo>
          <Amount className="header">수량</Amount>
          <OrderPrice className="header">주문금액</OrderPrice>
          <ReceivingDate className="header">수령일</ReceivingDate>
        </ItemContent>
      </ItemContentCon>
    );
  }

  if (title && price && option && receivingDate)
    return (
      <ItemContentCon>
        <ItemContent>
          <CheckBox>
            <input type="checkbox" />
          </CheckBox>
          <ProductInfo>
            <ProductImg>
              <img src={product_img} alt="" />
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
              type={"cart"}
              productCount={productCount}
              setProductCount={setProductCount}
            />
          </Amount>
          <OrderPrice>{formatNumberWithCommas(9900)}원</OrderPrice>
          <ReceivingDate>{receivingDate}</ReceivingDate>
        </ItemContent>
      </ItemContentCon>
    );
}

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-basis: 0%;
  padding: 14px 14px 14px 20px;

  input {
    width: 18px;
    height: 18px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 18;
  flex-basis: 50%;
  border-right: 1px solid rgba(160, 160, 160, 0.5);
  padding: 18px;
`;
const ProductImg = styled.div`
  flex-grow: 1;
  flex-basis: 15%;

  img {
    width: 100%;
  }
`;

const ProductText = styled.div`
  flex-grow: 7;
  flex-basis: 85%;
  margin-left: 20px;
`;
const ProductTextTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 11px;
`;
const ProductTextPrice = styled.div`
  font-size: 0.9rem;
  margin-bottom: 12px;
  padding-left: 3px;
  color: rgba(130, 130, 130, 1);
`;
const ProductTextOption = styled.div`
  font-size: 0.9rem;
  padding-left: 2px;
  color: rgba(130, 130, 130, 1);
`;

const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  flex-basis: 15%;
  border-right: 1px solid rgba(160, 160, 160, 0.5);
  padding: 14px;
`;
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
`;
const ReceivingDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  flex-basis: 15%;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: 400;
`;

const ItemContentCon = styled.div``;

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
    }
  }
`;
