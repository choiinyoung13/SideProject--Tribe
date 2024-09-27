import styled from 'styled-components'
import Input from '../components/Common/Input'
import google_logo from '../assets/images/logo/logo_google.png'
import kakao_logo from '../assets/images/logo/logo_kakao.png'
import login_image from '../assets/images/logo/login_web_1.jpg'
import useWindowWidth from '../hooks/useWindowWidth'
import loadingIcon from '../assets/images/logo/ball-triangle.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useHandleSignIn } from '../hooks/usehandleSignIn'
import Swal from 'sweetalert2'

export default function Login() {
  const windowWidth = useWindowWidth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSignIn, signInWithOAuth, errorMessage } = useHandleSignIn()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <LoginCon>
      <FormCon windowwidth={windowWidth}>
        <FormWrapper>
          <FormTitle>Tribe에 도착한 여러분 환영합니다.</FormTitle>
          <FormSubTitle>
            우리 함께 당신의 공간을 아름답게 꾸며 볼까요?
          </FormSubTitle>
          <form
            action=""
            onSubmit={e => {
              e.preventDefault()

              if (!email.trim()) {
                Swal.fire({
                  text: '아이디를 입력해 주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              if (!password.trim()) {
                Swal.fire({
                  text: '비밀번호를 입력해 주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              try {
                handleSignIn(email, password)
              } catch (e) {
                console.error(e)
              }
            }}
          >
            <EmailInput
              type="text"
              placeholder="가입한 이메일을 입력해주세요."
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
            />
            <PasswordInput
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <HelperTextCon>
              <HelperText>
                계정을 잊으셨나요? <span>ID찾기</span> 또는{' '}
                <span>비밀번호 찾기</span>
              </HelperText>
            </HelperTextCon>
            <LoginBtn type="submit">로그인</LoginBtn>
            <GoogleLoginBtn
              type="button"
              onClick={() => {
                signInWithOAuth('google')
              }}
            >
              <img src={google_logo} alt="" />
              Google로 시작하기
            </GoogleLoginBtn>
            <KaKaoLoginBtn
              type="button"
              onClick={() => {
                signInWithOAuth('kakao')
              }}
            >
              <img src={kakao_logo} alt="" />
              Kakao로 시작하기
            </KaKaoLoginBtn>
          </form>
          <HelperTextCon>
            <HelperText>
              아직 회원이 아니신가요?
              <span>
                <Link to={'/join'}> 회원가입</Link>
              </span>
            </HelperText>
          </HelperTextCon>
        </FormWrapper>
      </FormCon>

      <ImgCon>
        {!isImageLoaded && (
          <Loading>
            <img src={loadingIcon} alt="Loading..." />
          </Loading>
        )}
        <img
          src={login_image}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
        />
      </ImgCon>
    </LoginCon>
  )
}

const LoginCon = styled.div`
  width: 100%;
  display: flex;
`

interface FormConType {
  windowwidth: number
}

const FormCon = styled.div<FormConType>`
  width: ${props => (props.windowwidth >= 1920 ? '50%' : '100%')};
  height: 100vh;
  min-height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
      width: 100%;
      margin-bottom: 10px;
      border: 1px solid rgba(50, 50, 50, 0.3);
    }
  }

  @media (max-width: 600px) {
    min-height: 700px;

    form {
      input {
        width: 84%;
        margin-bottom: 10px;
      }
    }
  }
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 460px;

  @media (max-width: 600px) {
    align-items: center;
    min-width: 100%;
  }
`

const FormTitle = styled.h2`
  margin-top: 30px;
  font-size: 1.8rem;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }

  @media (max-width: 370px) {
    font-size: 1.1rem;
  }
`

const FormSubTitle = styled.p`
  font-size: 1rem;
  color: rgba(40, 40, 40, 1);
  margin: 20px 0 50px;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 20px 0 38px;
  }
`

const LoginBtn = styled.button`
  color: #fff;
  background-color: rgba(20, 20, 20, 1);
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: rgba(30, 30, 30, 1);
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 85%;
    margin: 0 auto 14px;
  }
`
const GoogleLoginBtn = styled.button`
  color: rgba(20, 20, 20, 1);
  background-color: #fff;
  padding: 12px 20px;
  cursor: pointer;
  border: 1px solid rgba(200, 200, 200, 1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 85%;
    margin: 0 auto 14px;

    img {
      width: 16px;
      height: 16px;
    }
  }
`

const KaKaoLoginBtn = styled.button`
  color: rgba(20, 20, 20, 1);
  background-color: #fae100;
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 85%;
    margin: 0 auto;
    margin-bottom: 10px;

    img {
      width: 16px;
      height: 16px;
    }
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

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`

const ImgCon = styled.div`
  width: 50%;
  height: 100vh;
  min-height: 900px;

  img {
    width: 100%;
    height: 100vh;
    min-height: 900px;
  }

  @media (max-width: 1919px) {
    display: none;
  }
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  img {
    width: 15%;
  }
`

const EmailInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;

  @media (max-width: 1450px) {
    width: 300px;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`

const PasswordInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;

  @media (max-width: 1450px) {
    width: 300px;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`
