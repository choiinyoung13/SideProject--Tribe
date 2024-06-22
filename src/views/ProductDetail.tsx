import React, { useState } from "react";
import styled from "styled-components";
import ImageSection from "../components/ProductDetail/ImageSection";
import TextSection from "../components/ProductDetail/TextSection";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchItemById } from "../utill/items/fetchItems";

export default function ProductDetail() {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [additionalOptionsPrice, setAdditionalOptionsPrice] = useState(0);
  const { id } = useParams<{ id: string }>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "default") {
      setAdditionalOptionsPrice(0);
    } else if (selectedValue === "편지로 마음 담기 (+2,500원)") {
      setAdditionalOptionsPrice(2500);
    } else if (selectedValue === "커브 라운드 화병 (+13,500원)") {
      setAdditionalOptionsPrice(13500);
    } else if (selectedValue === "미니 세라믹 화병 (+14,500원)") {
      setAdditionalOptionsPrice(14500);
    }
  };

  const { data, error, isLoading } = useQuery(
    "items" + id,
    () => fetchItemById(Number(id)),
    {
      enabled: !!id,
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    }
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  if (data)
    return (
      <DetailCon>
        <ImageSection image={data.imgurl} />
        <TextSection
          additionalOptionsPrice={additionalOptionsPrice}
          handleSelectChange={handleSelectChange}
          isDateSelected={isDateSelected}
          setIsDateSelected={setIsDateSelected}
          productInfo={data}
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
