import styled from "styled-components";
import error_image from "../assets/images/error_web_1.jpg";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <ErrorCon>
      <ImgCon>
        <img src={error_image} alt="" />
      </ImgCon>
      <TextCon>
        <Title>404</Title>
        <Desc>
          <DescH>Not found...</DescH>
          <DescB>Page you're looking for in not found</DescB>
        </Desc>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Go back
        </Button>
      </TextCon>
    </ErrorCon>
  );
}

const ErrorCon = styled.div`
  margin-top: 120px; // nav 높이
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImgCon = styled.div`
  width: 45%;
  min-width: 600px;
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 200px;

  img {
    width: 80%;
  }

  @media (max-width: 1250px) {
    display: none;
  }
`;
const TextCon = styled.div`
  width: 55%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;

  @media (max-width: 1250px) {
    align-items: center;
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 12rem;
  font-weight: 500;
  margin-top: 130px;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 8rem;
  }
`;
const Desc = styled.div`
  @media (max-width: 1250px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const DescH = styled.div`
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 14px;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;
const DescB = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 50px;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;
const Button = styled.button`
  width: 200px;
  cursor: pointer;
  padding: 10px;
  font-size: 1.8rem;
  color: #fff;
  background-color: rgba(30, 30, 30, 1);

  @media (max-width: 600px) {
    width: 170px;
    font-size: 1.5rem;
  }
`;
