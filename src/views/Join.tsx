import styled from "styled-components";
import Input from "../components/common/Input";
import { AiOutlinePlus } from "react-icons/ai";
import join_image from "../assets/images/join_web_1.jpg";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Join() {
  const windowWidth = useWindowWidth();

  return (
    <JoinCon>
      <FormCon windowWidth={windowWidth}>
        <FormWrapper>
          <FormTitle>Tribe 회원가입</FormTitle>
          <form action="">
            <IdInputCon>
              <Input
                type="text"
                placeholder="사용하실 아이디를 입력해주세요."
              />
              <button type="button">중복확인</button>
            </IdInputCon>
            <HelperTextCon>
              <HelperText>4~12자/영문 소문자(숫자 조합 가능)</HelperText>
            </HelperTextCon>
            <PasswordInputCon>
              <Input type="password" placeholder="비밀번호를 입력해주세요." />
              <Input
                type="password"
                placeholder="비밀번호 확인을 위해 다시 입력해주세요."
              />
            </PasswordInputCon>
            <HelperTextCon>
              <HelperText>
                6~20자/영문 대문자. 소문자, 숫자, 특수문자 중 2가지 이상 조합
              </HelperText>
            </HelperTextCon>

            <hr />
            <AgreeCon>
              <AgreeWrapper>
                <input type="checkbox" />
                <label htmlFor="">
                  {" "}
                  [필수]만 14세 이상이며 모두 동의합니다.
                </label>
              </AgreeWrapper>
              <AiOutlinePlus />
            </AgreeCon>
            <AgreeCon>
              <AgreeWrapper>
                <input type="checkbox" />
                <label htmlFor="">
                  {" "}
                  [선택]광고성 정보 수신에 모두 동의합니다.
                </label>
              </AgreeWrapper>
              <AiOutlinePlus />
            </AgreeCon>
            <JoinBtn type="submit">가입하기</JoinBtn>
          </form>
        </FormWrapper>
      </FormCon>
      {windowWidth === 1920 && (
        <ImgCon>
          <img src={join_image} alt="" />
        </ImgCon>
      )}
    </JoinCon>
  );
}

const JoinCon = styled.div`
  width: 100%;
  display: flex;
`;

interface FormConType {
  windowWidth: number;
}

const FormCon = styled.div<FormConType>`
  width: ${(props) => (props.windowWidth === 1920 ? "50%" : "100%")};
  height: 100vh;
  over-flow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
      margin-bottom: 10px;
    }
  }
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 460px;

  hr {
    width: 100%;
    margin-bottom: 30px;
  }

  @media (max-width: 600px) {
    min-width: 600px;

    hr {
      width: 80%;
      margin-bottom: 30px;
    }
  }
`;
const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    width: 85%;
    margin: 0 auto 30px;
    padding-left: 10px;
  }
`;
const IdInputCon = styled.div`
  width: 100%;
  display: flex;

  input {
    flex: 1 0 0;
  }

  button {
    height: 100%;
    font-size: 1rem;
    padding: 10px 12px;
    margin-left: 4px;
  }

  @media (max-width: 600px) {
    width: 80%;
    display: flex;
    margin: 0 auto;
    align-item: center;

    input {
      flex: 1 0 0;
    }

    button {
      font-size: 0.8rem;
      padding: 10px 12px;
      margin-left: 6px;
    }
  }
`;

const PasswordInputCon = styled.div`
  input {
    width: 100%;
  }
`;

const HelperTextCon = styled.div`
  width: 100%;
  display: flex;
  margin-left: 10px;

  @media (max-width: 600px) {
    width: 90%;
    margin-bottom: 40px;
    padding-left: 10px;
  }
`;

const HelperText = styled.p`
  font-size: 0.9rem;
  color: rgba(90, 90, 90, 1);
  margin: 6px 0 40px;
  cursor: pointer;

  span {
    font-weight: 600;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`;

const AgreeCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;

  @media (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const AgreeWrapper = styled.div`
  input {
    margin: 10px 10px 0 0;
  }

  label {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    label {
      font-size: 0.8rem;
    }
  }
`;
const JoinBtn = styled.button`
  color: #fff;
  background-color: rgba(20, 20, 20, 1);
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  margin-top: 30px;

  &:hover {
    background-color: rgba(30, 30, 30, 1);
  }

  @media (max-width: 600px) {
    width: 85%;
    margin: 30px auto 0;
  }
`;

const ImgCon = styled.div`
  width: 50%;
  height: 100vh;
  over-flow: hidden;

  img {
    width: 100%;
    height: 100vh;
  }
`;
