import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UnauthorizedAccess() {
  const navigate = useNavigate();

  return (
    <Container>
      <Main>
        <h2>로그인 후 이용 가능한 서비스입니다.</h2>
        <button onClick={() => navigate("/login")}>로그인 페이지로 이동</button>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  height: calc(100vh - 100px);
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h2 {
    font-size: 1.8rem;
    font-wigth: 800;
  }

  button {
    margin-top: 40px;
    font-size: 1.1rem;
    padding: 12px 18px;
    background-color: rgba(30, 30, 30, 1);
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: rgba(50, 50, 50, 1);
    }
  }
`;
