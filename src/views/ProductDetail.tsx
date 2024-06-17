import React, { useState } from "react";
import styled from "styled-components";
import image from "../assets/images/shop_item/item_1.jpg";
import formatNumberWithCommas from "../utill/formatNumberWithCommas";
import ImageSection from "../components/ProductDetail/ImageSection";
import TextSection from "../components/ProductDetail/TextSection";

export default function ProductDetail() {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [additionalOptionsPrice, setAdditionalOptionsPrice] = useState(0);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "default") {
      setAdditionalOptionsPrice(0);
    } else if (selectedValue === "A") {
      setAdditionalOptionsPrice(2500);
    } else if (selectedValue === "B") {
      setAdditionalOptionsPrice(13500);
    } else if (selectedValue === "C") {
      setAdditionalOptionsPrice(14500);
    }
  };

  return (
    <DetailCon>
      <ImageSection image={image} />
      <TextSection
        formatNumberWithCommas={formatNumberWithCommas}
        productCount={productCount}
        setProductCount={setProductCount}
        additionalOptionsPrice={additionalOptionsPrice}
        handleSelectChange={handleSelectChange}
        isDateSelected={isDateSelected}
        setIsDateSelected={setIsDateSelected}
      />
    </DetailCon>
  );
}

const DetailCon = styled.div`
  position: relative;
  top: 120px; // nav 높이
  width: 75%;
  margin: 30px auto 0px;
  display: flex;

  @media (max-width: 1024px) {
    top: 90px; // nav 높이
    width: 100%;
    margin: 0px auto;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    top: 60px;
    width: 100%;
    margin: 0px;
    flex-direction: column;
  }
`;
