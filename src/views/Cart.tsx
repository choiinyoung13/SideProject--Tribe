import styled from "styled-components";
import CartItem from "../components/Cart/CartItem";
import Button from "../components/common/Button";
import TotalPriceCon from "../components/Cart/TotalPriceCon";

export default function Cart() {
  return (
    <CartCon>
      <Title>장바구니</Title>
      <ItemCon>
        <CartItem type="header" />
        <CartItem
          title="용기가 필요할 땐, 푸에고 장미"
          price={9900}
          option="-"
          receivingDate="2024-06-20"
        />
      </ItemCon>
      <ItemSubButtonCon>
        <ButtonWrapper>
          <Button colorType="white" hover={false}>
            선택상품 삭제
          </Button>
          <Button colorType="white" hover={false}>
            품절상품 삭제
          </Button>
        </ButtonWrapper>
        <DetailDesc>
          장바구니는 최대 100개의 상품을 담을 수 있습니다.
        </DetailDesc>
      </ItemSubButtonCon>
      <PriceConWrapper>
        <TotalPriceCon />
      </PriceConWrapper>
      <ButtonCon>
        <button>계속 쇼핑하기</button>
        <button>결제하기</button>
      </ButtonCon>
    </CartCon>
  );
}

const CartCon = styled.div`
  position: relative;
  width: 80%;
  height: 70vh;
  margin: 150px auto;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: 600;
`;
const ItemCon = styled.div`
  border-top: 3px solid rgba(20, 20, 20, 1);
  border-bottom: 1px solid rgba(120, 120, 120, 1);
`;

const ItemSubButtonCon = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 280px;
`;

const PriceConWrapper = styled.div`
  margin-top: 90px;
  border: 1px solid grey;
`;

const DetailDesc = styled.div``;

const ButtonCon = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;

  button {
    padding: 16px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    width: 260px;

    &:first-of-type {
      background-color: #fff;
      border: 1px solid rgba(150, 150, 150, 1);
      margin-right: 14px;
    }

    &:last-of-type {
      background-color: rgba(20, 20, 20, 1);
      color: #fff;
      border: none;
    }
  }
`;
