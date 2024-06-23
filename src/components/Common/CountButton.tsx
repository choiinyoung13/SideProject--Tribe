import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCartMutations } from "../../mutations/useCartMutations";
import { useEffect } from "react";

interface OrderInfo {
  itemId: number;
  quantity: number;
  receivingDate: number;
  option: string;
  checked: boolean;
}

interface CountButtonPropsType {
  type?: string;
  productCount?: number;
  cartId: string;
  itemId: number;
  quantity: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  setOrderInfo?: React.Dispatch<React.SetStateAction<OrderInfo>>;
}

export default function CountButton({
  type,
  cartId,
  itemId,
  quantity,
  setCount,
  count,
  setOrderInfo,
}: CountButtonPropsType) {
  const { cartItemQuantityMutation } = useCartMutations();

  useEffect(() => {
    if (setOrderInfo) setOrderInfo((prev) => ({ ...prev, quantity: count }));
  }, [count]);

  return (
    <ButtonCon>
      <MinusButton
        type={type}
        onClick={() => {
          if (type === "cart") {
            const direction = "minus";
            if (quantity === 1) return;
            cartItemQuantityMutation.mutate({ cartId, itemId, direction });
            return;
          }
          if (type === "productDetail" && setCount) {
            if (count === 1) return;
            setCount((prev) => prev - 1);
            return;
          }
        }}
      >
        <AiOutlineMinus />
      </MinusButton>
      <Count type={type}>{type === "productDetail" ? count : quantity}</Count>
      <PlusButton
        type={type}
        onClick={() => {
          if (type === "cart") {
            const direction = "plus";
            cartItemQuantityMutation.mutate({ cartId, itemId, direction });
            return;
          }
          if (type === "productDetail" && setCount) {
            setCount((prev) => prev + 1);
            return;
          }
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
    padding: 4px;
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    padding: 2px;
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
    padding: 4px;
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    padding: 2px;
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
    padding: 4px;
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    padding: 2px;
    font-size: 0.8rem;
  }
`;
