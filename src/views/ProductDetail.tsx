import { useState, useEffect } from "react";
import styled from "styled-components";
import ImageSection from "../components/ProductDetail/ImageSection";
import TextSection from "../components/ProductDetail/TextSection";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchItemById } from "../config/api/items/fetchItems";
import loadingIcon from "../assets/images/logo/ball-triangle.svg";

export default function ProductDetail() {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const { data, error, isLoading } = useQuery(
    "items" + id,
    () => fetchItemById(Number(id)),
    {
      enabled: !!id,
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    }
  );

  if (isLoading)
    return (
      <LoadingPage>
        <LoadingIcon>
          <img src={loadingIcon} alt="" />
        </LoadingIcon>
      </LoadingPage>
    );

  if (error) return <div>Error...</div>;

  if (data)
    return (
      <DetailCon>
        <DetailWrapper>
          <ImageSection image={data.imgurl} />
          <TextSection
            isDateSelected={isDateSelected}
            setIsDateSelected={setIsDateSelected}
            productInfo={data}
          />
        </DetailWrapper>
      </DetailCon>
    );
}
const LoadingPage = styled.div`
  margin-top: 100px;
  height: 710px;
  width: 100%;
  display: flex;
  justify-content: center:
  align-items: center;
`;
const LoadingIcon = styled.div`
  display: flex;
  justify-content: center:
  align-items: center;
  width: 150px;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;

const DetailCon = styled.div`
  width: 90%;
  margin: 120px auto 40px;

  @media (max-width: 1024px) {
    margin: 0px;
    width: 100%;
  }

  @media (max-width: 600px) {
    margin-top: 40px;
    width: 100%;
  }
`;
const DetailWrapper = styled.div`
  display: flex;
  width: 85%;
  margin: 0px auto;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
  }
`;
