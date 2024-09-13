import React from "react";
import styled from "styled-components";
import FutureDatePicker from "../Common/DatePicker";
import { CartItemType } from "../../types/CartItemType";

interface DatePickerSectionProps {
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderInfo: React.Dispatch<React.SetStateAction<CartItemType>>;
  deliveryperiod: number;
  isDateSelected: boolean;
  receivingDate: number;
}

export default function DatePickerSection({
  setIsDateSelected,
  setOrderInfo,
  deliveryperiod,
  isDateSelected,
  receivingDate,
}: DatePickerSectionProps) {
  return (
    <DatePickerWrapper>
      <PickDateText>
        수령일
        <span>* (필수)</span>
      </PickDateText>
      <DatePicker>
        <FutureDatePicker
          daysOffset={deliveryperiod}
          setIsDateSelected={setIsDateSelected}
          setOrderInfo={setOrderInfo}
          isDateSelected={isDateSelected}
          type={"productDetail"}
          receivingDate={receivingDate}
        />
      </DatePicker>
    </DatePickerWrapper>
  );
}

const DatePickerWrapper = styled.div`
  margin: 40px 0;
  width: 100%;

  @media (max-width: 1024px) {
    margin: 36px 0 35px;
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
