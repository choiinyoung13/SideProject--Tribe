import styled from 'styled-components'

interface ProductInfoPropsType {
  title: string
  size: string
  origin: string
  classification: string
  deliveryPeriod: number
}

export default function ProductInfo({
  title,
  size,
  origin,
  classification,
  deliveryPeriod,
}: ProductInfoPropsType) {
  return (
    <>
      <Title>{title}</Title>
      <InfoWrapper>
        <Info>
          <InfoKey>사이즈</InfoKey>
          <InfoValue>{size}</InfoValue>
        </Info>
        <Info>
          <InfoKey>분류</InfoKey>
          <InfoValue>{classification}</InfoValue>
        </Info>
        <Info>
          <InfoKey>원산지</InfoKey>
          <InfoValue>{origin}</InfoValue>
        </Info>
        <Info>
          <InfoKey>배송기간</InfoKey>
          <InfoValue>{deliveryPeriod}일</InfoValue>
        </Info>
      </InfoWrapper>
    </>
  )
}

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
`

const InfoWrapper = styled.div`
  margin: 30px 0px 40px;
  display: flex;
  padding-bottom: 2px;

  justify-content: space-between;
  width: 100%;
  max-width: 730px;

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
  scrollbar-color: rgba(210, 210, 210, 1) #fff;

  @media (max-width: 1024px) {
    width: 90%;
    margin: 30px auto 0px;
    scrollbar-color: rgba(210, 210, 210, 0) #fff;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 330px;
    scrollbar-color: rgba(210, 210, 210, 0) #fff;
  }

  @media (max-width: 350px) {
    width: 100%;
    min-width: 100%;
    scrollbar-color: rgba(210, 210, 210, 0) #fff;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 60px;
  border-left: 1px solid rgba(90, 90, 90, 1);
  flex-shrink: 0;

  &:first-of-type {
    border: none;
    padding: 4px 60px 4px 40px;
  }

  &:last-of-type {
    padding: 4px 40px 4px 40px;
  }

  @media (max-width: 1024px) {
    margin: 0px;
    align-items: center;
    flex-grow: 1;
  }

  @media (max-width: 600px) {
    margin: 0px;
    align-items: center;
    padding: 10px;
    border-left: 1px solid rgba(90, 90, 90, 0.3);

    &:first-of-type {
      padding: 0px;
      border: none;
      flex-grow: 1;
    }

    &:nth-child(2) {
      padding: 0px;
      flex-grow: 1;
    }

    &:nth-child(3) {
      padding: 0px;
      flex-grow: 1;
    }

    &:last-of-type {
      padding: 0px 0px 0px 8px;
      flex-grow: 0.5;
    }
  }
`

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
`

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
`
