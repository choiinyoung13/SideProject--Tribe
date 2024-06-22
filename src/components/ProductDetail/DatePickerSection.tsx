import React from "react";
import styled from "styled-components";
import FutureDatePicker from "../Common/DatePicker";

interface OrderInfo {
  itemId: number;
  quantity: number;
  receivingDate: number;
  option: string;
  checked: boolean;
}

interface DatePickerSectionProps {
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderInfo: React.Dispatch<React.SetStateAction<OrderInfo>>;
}

export default function DatePickerSection({
  setIsDateSelected,
  setOrderInfo,
}: DatePickerSectionProps) {
  return (
    <DatePickerWrapper>
      <PickDateText>
        수령일
        <span>* (필수)</span>
      </PickDateText>
      <DatePicker>
        <FutureDatePicker
          daysOffset={2}
          setIsDateSelected={setIsDateSelected}
          setOrderInfo={setOrderInfo}
        />
      </DatePicker>
    </DatePickerWrapper>
  );
}

const DatePickerWrapper = styled.div`
  margin: 40px 0;
  width: 100%;

  @media (max-width: 1024px) {
    margin: 35px 0;
  }

  @media (max-width: 600px) {
    margin: 35px 0;
  }
`;

const PickDateText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  width: 100%;

  span {
    color: rgb(223, 33, 19);
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

const DatePicker = styled.div`
  margin-top: 10px;
  width: 100%;
`;
