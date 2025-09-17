import styled from 'styled-components'
import login_image from '../assets/images/logo/login_web_1.jpg'
import useWindowWidth from '../hooks/useWindowWidth'
import loadingIcon from '../assets/images/logo/ball-triangle.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useHandleSignIn } from '../hooks/usehandleSignIn'
import Swal from 'sweetalert2'
import { useHandleSignUp } from '../hooks/usehandleSignUp'
import { LoginForm } from '../components/Login/LoginForm'
import { SocialLoginButtons } from '../components/Login/SocialLoginButtons'
import { LAYOUT_CONSTANTS } from '../constants/layoutConstants'

export default function Login() {
  const windowWidth = useWindowWidth()
  const { handleSignIn, signInWithOAuth, errorMessage } = useHandleSignIn()
  const { verifyOtpCode } = useHandleSignUp()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // 인증번호 입력 모달 띄우기
  const openVerificationModal = (email: string) => {
    Swal.fire({
      html: `
        <h1 style="font-weight:500; font-size:22px;">인증번호 입력</h1>
        <input type="text" id="otp-code" class="swal2-input" placeholder="6자리 인증번호 입력">
      `,
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
      allowOutsideClick: false,
      confirmButtonColor: '#1E1E1E',
      cancelButtonColor: '#1E1E1E',
      preConfirm: () => {
        const otpCode = (
          document.getElementById('otp-code') as HTMLInputElement
        ).value
        if (!otpCode || otpCode.length !== 6) {
          Swal.showValidationMessage('6자리 인증번호를 입력하세요.')
          return false
        }
        return otpCode
      },
    }).then(async result => {
      if (result.isConfirmed && result.value) {
        // 인증번호 검증 로직 실행
        const res = await verifyOtpCode(email, result.value)

        if (res.success) {
          Swal.fire({
            text: '이메일 인증이 완료되었습니다!',
            icon: 'success',
            confirmButtonColor: '#1E1E1E',
            confirmButtonText: '확인',
          }).then(() => {
            // 인증 성공 후 리다이렉트
            navigate('/')
            return
          })
        } else if (!res.success && res.error) {
          if (res.error.message === 'Token has expired or is invalid') {
            Swal.fire({
              text: '인증코드가 유효하지 않습니다.',
              icon: 'warning',
              confirmButtonColor: '#1E1E1E',
              confirmButtonText: '확인',
            }).then(result => {
              if (result.isConfirmed && result.value) {
                openVerificationModal(email)
                return
              }
            })
          } else {
            Swal.fire({
              text: '인증과정 중 오류가 발생했습니다.',
              icon: 'warning',
              confirmButtonColor: '#1E1E1E',
              confirmButtonText: '확인',
            }).then(result => {
              if (result.isConfirmed && result.value) {
                openVerificationModal(email)
                return
              }
            })
          }
        }
      }
    })
  }

  // 로그인 폼 제출 핸들러
  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true)

    const result = await handleSignIn(email, password)

    if (!result.success && result.error) {
      if (result?.error?.message === 'Email not confirmed') {
        Swal.fire({
          text: '이메일 인증이 완료되지 않은 계정입니다.',
          icon: 'warning',
          allowOutsideClick: false,
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        }).then(result => {
          if (result.isConfirmed && result.value) {
            openVerificationModal(email)
          }
        })
      }
    }

    setIsLoading(false)
  }

  // 소셜 로그인 핸들러
  const handleGoogleLogin = () => {
    signInWithOAuth('google')
  }

  const handleKakaoLogin = () => {
    signInWithOAuth('kakao')
  }

  return (
    <LoginCon>
      <FormCon windowwidth={windowWidth}>
        <FormWrapper>
          <FormTitle>Tribe에 도착한 여러분 환영합니다.</FormTitle>
          <FormSubTitle>
            우리 함께 당신의 공간을 아름답게 꾸며 볼까요?
          </FormSubTitle>

          <LoginForm
            onSubmit={handleLoginSubmit}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />

          <HelperTextCon>
            <HelperText>
              계정을 잊으셨나요? <span>ID찾기</span> 또는{' '}
              <span>비밀번호 찾기</span>
            </HelperText>
          </HelperTextCon>

          <SocialLoginButtons
            onGoogleLogin={handleGoogleLogin}
            onKakaoLogin={handleKakaoLogin}
            isLoading={isLoading}
          />

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
  width: ${props =>
    props.windowwidth >= LAYOUT_CONSTANTS.BREAKPOINTS.DESKTOP ? '50%' : '100%'};
  height: 100vh;
  min-height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    min-height: 700px;
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
