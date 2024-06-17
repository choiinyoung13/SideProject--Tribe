import React from "react";
import styled from "styled-components";
import PriceInfo from "../../components/ProductDetail/PriceInfo";
import ProductInfo from "../../components/ProductDetail/ProductInfo";
import DatePickerSection from "../../components/ProductDetail/DatePickerSection";
import OptionsSection from "../../components/ProductDetail/OptionSection";
import TotalPriceSection from "../../components/ProductDetail/TotalPriceSection";
import ButtonSection from "../../components/ProductDetail/ButtonSection";

interface TextSectionProps {
  formatNumberWithCommas: (num: number) => string;
  productCount: number;
  setProductCount: React.Dispatch<React.SetStateAction<number>>;
  additionalOptionsPrice: number;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isDateSelected: boolean;
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TextSection({
  formatNumberWithCommas,
  productCount,
  setProductCount,
  additionalOptionsPrice,
  handleSelectChange,
  isDateSelected,
  setIsDateSelected,
}: TextSectionProps) {
  return (
    <TextSectionCon>
      <PriceInfo formatNumberWithCommas={formatNumberWithCommas} />
      <ProductInfo />
      <DatePickerSection setIsDateSelected={setIsDateSelected} />
      <OptionsSection handleSelectChange={handleSelectChange} />
      <TotalPriceSection
        formatNumberWithCommas={formatNumberWithCommas}
        productCount={productCount}
        additionalOptionsPrice={additionalOptionsPrice}
        setProductCount={setProductCount}
      />
      <ButtonSection isDateSelected={isDateSelected} />
    </TextSectionCon>
  );
}

const TextSectionCon = styled.section`
  width: 40%;
  min-width: 500px;
  padding: 30px 0px 0px 60px;
  border-left: 1px solid rgba(150, 150, 150, 1);

  @media (max-width: 1024px) {
    width: 100%;
    min-width: 100%;
    padding: 30px;
    border-left: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    padding: 20px;
    border-left: none;
  }
`;
