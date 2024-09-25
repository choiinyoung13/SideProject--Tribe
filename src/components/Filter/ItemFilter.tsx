import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { useState } from "react";
import SelectOptionBox from "./ItemFilterSelectOptionBox";
import { convertToKorean } from "../../utill/convertToKorean";

interface ItemFilterProps {
  type: "size" | "price" | "color";
}

export default function ItemFilter({ type }: ItemFilterProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <FiterWrapper
      onClick={() => {
        if (isActive) return;
        setIsActive(true);
      }}
    >
      <TextCon>
        <Title
          onClick={() => {
            setIsActive(false);
          }}
        >
          {convertToKorean(type)}
          {isActive && (
            <MinusIcon>
              <BiMinus />
            </MinusIcon>
          )}
        </Title>
        {!isActive ? (
          <Desc>모든 {convertToKorean(type)}</Desc>
        ) : (
          <SelectOptionBox type={type} />
        )}
      </TextCon>
      {!isActive && (
        <Icon>
          <AiOutlinePlus />
        </Icon>
      )}
    </FiterWrapper>
  );
}

const FiterWrapper = styled.div`
  border-bottom: 1px solid rgba(210, 210, 210, 1);
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 1s ease;
`;

const TextCon = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Icon = styled.div`
  font-size: 1.1rem;
  color: rgba(160, 160, 160, 1);

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
  color: rgba(20, 20, 20, 1);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`;

const Desc = styled.span`
  font-size: 0.9rem;
  color: rgba(160, 160, 160, 1);

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`;

const MinusIcon = styled.div`
  font-size: 1.2rem;
  color: rgba(160, 160, 160, 1);

  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`;
