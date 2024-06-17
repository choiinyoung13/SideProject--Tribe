import styled from "styled-components";
import CartItem from "../components/Cart/CartItem";
import Button from "../components/common/Button";
import TotalPriceSection from "../components/Cart/TotalPriceSection";
import useWindowWidth from "../hooks/useWindowWidth";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const windowWidth = useWindowWidth();
  const navitgate = useNavigate();

  return (
    <CartCon>
      <Title>장바구니</Title>
      {windowWidth < 1024 && (
        <CheckHeader>
          <CheckHeaderLeft>
            <div>
              <input type="checkbox" />
            </div>
            <div>전체선택 (1/2)</div>
          </CheckHeaderLeft>
          <CheckHeaderRight>선택삭제</CheckHeaderRight>
        </CheckHeader>
      )}
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
        <TotalPriceSection />
      </PriceConWrapper>
      <ButtonCon>
        <button
          onClick={() => {
            navitgate("/shop");
          }}
        >
          계속 쇼핑하기
        </button>
        <button>결제하기</button>
      </ButtonCon>
    </CartCon>
  );
}

const CartCon = styled.div`
  position: relative;
  width: 75%;
  height: 70vh;
  margin: 150px auto;

  @media (max-width: 1024px) {
    width: 90%;
    height: auto;
    margin: 100px auto;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 60px auto;
    padding: 0 14px;
  }
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: 600;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const CheckHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 6px;
`;

const CheckHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;

    input {
      width: 14px;
      height: 14px;
      margin-right: 8px;
    }
  }
`;
const CheckHeaderRight = styled.div`
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const ItemCon = styled.div`
  border-top: 3px solid rgba(20, 20, 20, 1);
  border-bottom: 1px solid rgba(120, 120, 120, 1);

  @media (max-width: 1024px) {
    border-top: 2px solid rgba(20, 20, 20, 1);
  }

  @media (max-width: 600px) {
    border-top: 1px solid rgba(20, 20, 20, 1);
  }
`;

const ItemSubButtonCon = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-end;
    margin-top: 15px;
  }

  @media (max-width: 600px) {
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 280px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const PriceConWrapper = styled.div`
  margin-top: 90px;
  border: 1px solid grey;

  @media (max-width: 1024px) {
    margin-top: 60px;
  }

  @media (max-width: 600px) {
    margin-top: 30px;
  }
`;

const DetailDesc = styled.div`
  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const ButtonCon = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 50px;

  @media (max-width: 1024px) {
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
  }

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

      @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }

    &:last-of-type {
      background-color: rgba(20, 20, 20, 1);
      color: #fff;
      border: none;
    }

    @media (max-width: 600px) {
      width: 100%;
      font-size: 1rem;
    }
  }
`;
