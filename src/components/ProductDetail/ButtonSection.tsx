import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useCartMutations } from "../../mutations/useCartMutations";
import { hasCheckedItemInCartByID } from "../../config/api/cart/hasCheckedItemsInCart ";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

interface OrderInfo {
  itemId: number;
  quantity: number;
  receivingDate: number;
  option: string;
  checked: boolean;
}

interface ButtonSectionProps {
  isDateSelected: boolean;
  orderInfo: OrderInfo;
}

export default function ButtonSection({
  isDateSelected,
  orderInfo,
}: ButtonSectionProps) {
  const { addItemToCartMutation } = useCartMutations();
  const navigate = useNavigate();
  const { id } = useParams();
  const { session } = useAuth();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const checkItemById = async () => {
      if (session) {
        const res = await hasCheckedItemInCartByID(session.user.id, Number(id));
        setIsInCart(res);
      }
    };
    checkItemById();
  }, [id, session]);

  return (
    <ButtonCon>
      {isDateSelected ? (
        <ButtonOption2>
          <button
            type="button"
            onClick={() => {
              alert("구매해주셔서 감사합니다");
              navigate("/shop");
            }}
          >
            바로 구매
          </button>
          {isInCart ? (
            <button
              type="button"
              onClick={() => {
                navigate("/cart");
              }}
            >
              장바구니에 들어있어요!
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                addItemToCartMutation.mutate({
                  userId: session!.user.id,
                  itemId: orderInfo.itemId,
                  quantity: orderInfo.quantity,
                  receivingDate: orderInfo.receivingDate,
                  option: orderInfo.option,
                  checked: orderInfo.checked,
                });
                alert("장바구니에 추가 되었습니다. 감사합니다.");
                navigate("/shop");
              }}
            >
              장바구니에 담기
            </button>
          )}
        </ButtonOption2>
      ) : (
        <ButtonOption1>
          <button type="button">수령일을 선택해주세요</button>
        </ButtonOption1>
      )}
    </ButtonCon>
  );
}

const ButtonCon = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const ButtonOption1 = styled.div`
  button {
    cursor: pointer;
    width: 100%;
    background-color: rgba(30, 30, 30, 1);
    border: none;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 12px 0px;

    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;

const ButtonOption2 = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    cursor: pointer;
    width: 100%;
    border: none;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 12px 0px;

    &:first-of-type {
      background-color: #fff;
      color: rgba(30, 30, 30, 1);
      border: 1px solid rgba(190, 190, 190, 1);
      width: 49%;
    }

    &:last-of-type {
      background-color: rgba(30, 30, 30, 1);
      color: #fff;
      width: 49%;
    }

    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;
