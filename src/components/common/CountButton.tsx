import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface CountButtonPropsType {
  type?: string;
  productCount: number;
  setProductCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CountButton({
  type,
  productCount,
  setProductCount,
}: CountButtonPropsType) {
  return (
    <ButtonCon>
      <MinusButton
        type={type}
        onClick={() => {
          if (productCount === 1) return;
          setProductCount((prev) => prev - 1);
        }}
      >
        <AiOutlineMinus />
      </MinusButton>
      <Count type={type}>{productCount}</Count>
      <PlusButton
        type={type}
        onClick={() => {
          setProductCount((prev) => prev + 1);
        }}
      >
        <AiOutlinePlus />
      </PlusButton>
    </ButtonCon>
  );
}

interface CountButtonType {
  type?: string;
}

const ButtonCon = styled.div`
  border: 1px solid rgba(200, 200, 200, 1);
  display: flex;
`;

const PlusButton = styled.div<CountButtonType>`
  padding: ${(props) => (props.type === "cart" ? "6px" : "4px")};
  cursor: pointer;
  display: flex;
  align-items: start;
  justify-content: center;
  font-size: ${(props) => (props.type === "cart" ? "1.1rem" : "0.9rem")};

  @media (max-width: 1024px) {
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const MinusButton = styled.div<CountButtonType>`
  padding: ${(props) => (props.type === "cart" ? "6px" : "4px")};
  cursor: pointer;
  display: flex;
  align-items: start;
  justify-content: center;
  font-size: ${(props) => (props.type === "cart" ? "1.1rem" : "0.9rem")};

  @media (max-width: 1024px) {
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Count = styled.div<CountButtonType>`
  border-left: 1px solid rgba(200, 200, 200, 1);
  border-right: 1px solid rgba(200, 200, 200, 1);
  padding: ${(props) => (props.type === "cart" ? "6px" : "4px")};
  display: flex;
  align-items: start;
  justify-content: center;
  width: 24px;
  font-size: ${(props) => (props.type === "cart" ? "1rem" : "0.9rem")};

  @media (max-width: 1024px) {
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;
