import styled from "styled-components";

export default function OptionsSection() {
  return (
    <OptionCon>
      <OptionTitle>구매 전 확인 사항</OptionTitle>
      <TextWrapper>
        <p>
          - 농장 수급 상황에 따라 가격과 일부 꽃 구성이 유동적으로 변경될 수
          있다는 점 양해 부탁드립니다. <br />- 택배 배송으로 인한 약간의 꽃
          눌림이 있을 수 있습니다.
          <br />- 일조량 및 작황 상황에 따라서 꽃의 색감이 조금씩 달라질 수 있는
          점 참고부탁드립니다.
        </p>
      </TextWrapper>
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
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 10px;

  span {
    color: rgba(120, 120, 120, 1);
    font-size: 1rem;
    font-weight: 400;
  }

  @media (max-width: 1980px) {
    font-size: 1.1rem;
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

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  p {
    font-size: 1.1rem;
    line-height: 32px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1980px) {
    p {
      font-size: 0.9rem;
      line-height: 26px;
    }
  }

  @media (max-width: 600px) {
    p {
      font-size: 0.8rem;
    }
  }
`;
