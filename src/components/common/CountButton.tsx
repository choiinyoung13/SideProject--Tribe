import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface CountButtonPropsType {
  productCount: number;
  setProductCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CountButton({
  productCount,
  setProductCount,
}: CountButtonPropsType) {
  return (
    <ButtonCon>
      <MinusButton
        onClick={() => {
          if (productCount === 1) return;
          setProductCount((prev) => prev - 1);
        }}
      >
        <AiOutlineMinus />
      </MinusButton>
      <Count>{productCount}</Count>
      <PlusButton
        onClick={() => {
          setProductCount((prev) => prev + 1);
        }}
      >
        <AiOutlinePlus />
      </PlusButton>
    </ButtonCon>
  );
}

const ButtonCon = styled.div`
  border: 1px solid rgba(200, 200, 200, 1);
  display: flex;
`;

const PlusButton = styled.div`
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: start;
  justify-content: center;
  font-size: 0.9rem;

  @media (max-width: 1024px) {
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const MinusButton = styled.div`
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: start;
  justify-content: center;
  font-size: 0.9rem;

  @media (max-width: 1024px) {
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Count = styled.div`
  border-left: 1px solid rgba(200, 200, 200, 1);
  border-right: 1px solid rgba(200, 200, 200, 1);
  padding: 4px;
  display: flex;
  align-items: start;
  justify-content: center;
  width: 24px;
  font-size: 0.9rem;

  @media (max-width: 1024px) {
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;
