import styled from 'styled-components'
import Input from '../components/common/Input'
import google_logo from '../assets/images/logo_google.png'
import kakao_logo from '../assets/images/logo_kakao.png'

export default function Login() {
  return (
    <LoginCon>
      <FormCon>
        <FormWrapper>
          <FormTitle>Tribe에 도착한 여러분 환영합니다.</FormTitle>
          <FormSubTitle>
            우리 함께 당신의 공간을 아름답게 꾸며 볼까요?
          </FormSubTitle>
          <form action="">
            <Input
              type="text"
              placeholder="아이디 또는 이메일을 입력해주세요."
            />
            <Input type="password" placeholder="비밀번호를 입력해주세요." />
            <HelperTextCon>
              <HelperText>
                계정을 잊으셨나요? <span>ID찾기</span> 또는{' '}
                <span>비밀번호 찾기</span>
              </HelperText>
            </HelperTextCon>
            <LoginBtn type="submit">로그인</LoginBtn>
            <GoogleLoginBtn type="submit">
              <img src={google_logo} alt="" />
              Google로 시작하기
            </GoogleLoginBtn>
            <KaKaoLoginBtn type="submit">
              <img src={kakao_logo} alt="" />
              Kakao로 시작하기
            </KaKaoLoginBtn>
          </form>
        </FormWrapper>
      </FormCon>
      <ImgCon></ImgCon>
    </LoginCon>
  )
}

const LoginCon = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`

const FormCon = styled.div`
  width: 50%;
  height: 100%;
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
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 460px;
`
const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`

const FormSubTitle = styled.p`
  font-size: 1rem;
  color: rgba(40, 40, 40, 1);
  margin: 20px 0 50px;
`

const LoginBtn = styled.button`
  color: #fff;
  background-color: rgba(20, 20, 20, 1);
  padding: 12px 20px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgba(30, 30, 30, 1);
  }
`
const GoogleLoginBtn = styled.button`
  color: rgba(20, 20, 20, 1);
  background-color: #fff;
  padding: 12px 20px;
  cursor: pointer;
  border: 1px solid rgba(200, 200, 200, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`

const KaKaoLoginBtn = styled.button`
  color: rgba(20, 20, 20, 1);
  background-color: #fae100;
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`

const HelperTextCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const HelperText = styled.p`
  font-size: 0.9rem;
  color: rgba(90, 90, 90, 1);
  margin: 6px 0 50px;
  cursor: pointer;

  span {
    font-weight: 600;
  }
`

const ImgCon = styled.div`
  width: 50%;
  height: 100%;
  background-color: rgba(230, 230, 230, 1);
`
