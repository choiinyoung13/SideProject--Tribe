import styled from "styled-components";
import image from "../assets/images/shop_item/item_1.jpg";
import formatNumberWithCommas from "../utill/formatNumberWithCommas";
import FutureDatePicker from "../components/common/DatePicker";
import { PiFlowerLight } from "react-icons/pi";
import { useState } from "react";
import CountButton from "../components/common/CountButton";

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
      <ImgSection>
        <ImgWrapper>
          <img src={image} alt="" draggable={false} />
        </ImgWrapper>
      </ImgSection>
      <TextSection>
        <PriceCon>
          <DiscountedPrice>{formatNumberWithCommas(9900)}원</DiscountedPrice>
          <DiscountInfo>
            <Discount>{28}%</Discount>
            <OriginalPrice>{formatNumberWithCommas(13900)}원</OriginalPrice>
          </DiscountInfo>
        </PriceCon>
        <Title>용기가 필요할 땐, 푸에고 장미</Title>

        <InfoWrapper>
          <Info>
            <InfoKey>사이즈</InfoKey>
            <InfoValue>Small</InfoValue>
          </Info>
          <Info>
            <InfoKey>분류</InfoKey>
            <InfoValue>Single Line</InfoValue>
          </Info>
          <Info>
            <InfoKey>원산지</InfoKey>
            <InfoValue>스페인</InfoValue>
          </Info>
          <Info>
            <InfoKey>배송기간</InfoKey>
            <InfoValue>2일</InfoValue>
          </Info>
        </InfoWrapper>
        <DatePickerWrapper>
          <PickDateText>
            수령일
            <span>* (필수)</span>
          </PickDateText>
          <DatePicker>
            <FutureDatePicker
              daysOffset={2}
              setIsDateSelected={setIsDateSelected}
            />
          </DatePicker>
        </DatePickerWrapper>
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
        <TotalPriceCon>
          <TotalPriceTitle>주문정보</TotalPriceTitle>
          <PriceInfoBox>
            <MainProductPrice>
              <MainProduct>용기가 필요할 땐, 푸에고 장미</MainProduct>
              <div>
                <CountButton
                  productCount={productCount}
                  setProductCount={setProductCount}
                />
              </div>
            </MainProductPrice>
            <div></div>
            <DeliveryPriceText>
              <div>배송비</div>
              <div>2,900원</div>
            </DeliveryPriceText>
            <TotalPriceText>
              <div>총 주문금액</div>
              <div>
                {formatNumberWithCommas(
                  9900 * productCount + 2900 + additionalOptionsPrice
                )}
                원
              </div>
            </TotalPriceText>
          </PriceInfoBox>
        </TotalPriceCon>
        <ButtonCon>
          {isDateSelected ? (
            <ButtonOption2>
              <button type="button">바로 구매</button>
              <button type="button">장바구니에 담기</button>
            </ButtonOption2>
          ) : (
            <ButtonOption1>
              <button type="button">수령일을 선택해주세요</button>
            </ButtonOption1>
          )}
        </ButtonCon>
      </TextSection>
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

const ImgSection = styled.section`
  width: 60%;
  min-width: 556px;
  max-width: 806px;
  height: 100%;
  padding: 0px 60px 0px 30px;

  @media (max-width: 1024px) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0px;
  }

  @media (max-width: 600px) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0px;
  }
`;

const ImgWrapper = styled.section`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }
`;

const TextSection = styled.section`
  width: 40%;
  min-width: 500px;
  padding: 30px 30px 0px 60px;
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

const PriceCon = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 6px;
`;

const DiscountInfo = styled.div`
  display: flex;
  margin-left: 10px;

  @media (max-width: 1024px) {
    margin-left: 7px;
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    margin-left: 7px;
    font-size: 0.9rem;
  }
`;

const Discount = styled.div`
  color: rgb(223, 33, 19);
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  text-decoration-color: rgba(120, 120, 120, 1);
  color: rgba(120, 120, 120, 1);
  margin-left: 6px;
`;

const DiscountedPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 6px;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 16px;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
    margin-top: 10px;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-top: 10px;
  }
`;

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

const InfoWrapper = styled.div`
  margin: 30px 0px 40px;
  display: flex;
  justify-content: space-between;
  width: 100%
  min-width: 600px;
  display: flex;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 6px; 
  }

  scrollbar-width: thin; 
  scrollbar-color: rgba(210,210,210,1) #fff;

  @media (max-width: 1024px) {
    margin: 30px 0px 0px 0px;
    scrollbar-color: rgba(210,210,210,0) #fff;
  }

  @media (max-width: 600px) {
    margin: 30px 0px 0px 0px;
    scrollbar-color: rgba(210,210,210,0) #fff;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 34px;
  border-left: 1px solid rgba(90, 90, 90, 1);
  flex-shrink: 0;

  &:first-of-type {
    border: none;
    padding: 4px 34px 4px 0px;
  }

  &:last-of-type {
    padding: 4px 0px 4px 34px;
  }

  @media (max-width: 1024px) {
    margin: 0px;
    align-items: center;
    padding: 4px 70px;
    border-left: 1px solid rgba(190, 190, 190, 1);

    &:first-of-type {
      border: none;
      padding-left: 20px;
      padding-right: 70px;
    }

    &:last-of-type {
      padding-right: 20px;
      padding-left: 70px;
    }
  }

  @media (max-width: 600px) {
    margin: 0px;
    align-items: center;
    padding: 4px 34px;
    border-left: 1px solid rgba(190, 190, 190, 1);

    &:first-of-type {
      border: none;
      padding-right: 30px;
    }

    &:last-of-type {
      padding-left: 30px;
    }
  }
`;

const InfoKey = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(90, 90, 90, 1);

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: rgba(60, 60, 60, 1);
  margin-top: 10px;

  @media (max-width: 1024px) {
    font-size: 1rem;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

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

const TotalPriceCon = styled.div``;

const TotalPriceTitle = styled.span`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const DeliveryPriceText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  padding: 0px 4px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }
`;

const TotalPriceText = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 0px 4px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0px 6px;
  }
`;

const PriceInfoBox = styled.div`
  width: 100%;
  background-color: rgba(240, 240, 240, 1);
  padding: 20px 14px 26px;
`;

const MainProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 10px;
`;

const MainProduct = styled.div`
  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

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
