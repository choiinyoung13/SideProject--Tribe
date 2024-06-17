import React from "react";
import styled from "styled-components";
import { PiFlowerLight } from "react-icons/pi";

interface OptionsSectionProps {
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function OptionsSection({
  handleSelectChange,
}: OptionsSectionProps) {
  return (
    <OptionCon>
      <OptionTitle>
        추가상품
        <span>(선택)</span>
      </OptionTitle>
      <SelectWrapper>
        <FlowerIcon>
          <PiFlowerLight />
        </FlowerIcon>
        <select name="" id="" onChange={handleSelectChange}>
          <option value="default">기본 화병 (+0원)</option>
          <option value="A">편지로 마음 담기 (+2,500원)</option>
          <option value="B">커브 라운드 화병 (+13,500원)</option>
          <option value="C">미니 세라믹 화병 (+14,500원)</option>
        </select>
      </SelectWrapper>
    </OptionCon>
  );
}

const OptionCon = styled.div`
  margin: 40px 0px;

  @media (max-width: 1024px) {
    margin: 35px 0;
  }

  @media (max-width: 600px) {
    margin: 35px 0;
  }
`;

const OptionTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;

  span {
    color: rgba(120, 120, 120, 1);
    font-size: 1rem;
    font-weight: 400;
  }

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    span {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    span {
      font-size: 0.8rem;
    }
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  select {
    width: 100%;
    font-size: 0.9rem;
    padding: 4px 2px;

    option {
      padding 4px 0px;
    }
  }

  @media (max-width: 1024px) {
 
  }

  @media (max-width: 600px) {
    select {
      font-size: 0.8rem;
    }
  }
`;

const FlowerIcon = styled.div`
  padding-top: 2px;
  margin-right: 8px;
  font-size: 1.4rem;

  @media (max-width: 1024px) {
    padding-top: 0px;
    font-size: 1.3rem;
  }

  @media (max-width: 600px) {
    padding-top: 0px;
    font-size: 1.3rem;
  }
`;
