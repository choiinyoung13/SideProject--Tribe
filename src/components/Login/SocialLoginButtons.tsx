import styled from 'styled-components'
import google_logo from '../../assets/images/logo/logo_google.png'
import kakao_logo from '../../assets/images/logo/logo_kakao.png'

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void
  onKakaoLogin: () => void
  isLoading?: boolean
}

/**
 * 소셜 로그인 버튼들 컴포넌트 - 소셜 로그인 로직을 분리
 */
export const SocialLoginButtons = ({
  onGoogleLogin,
  onKakaoLogin,
  isLoading = false,
}: SocialLoginButtonsProps) => {
  return (
    <SocialButtonsContainer>
      <GoogleLoginBtn
        type="button"
        onClick={onGoogleLogin}
        disabled={isLoading}
      >
        <img src={google_logo} alt="Google" />
        Google로 시작하기
      </GoogleLoginBtn>
      <KakaoLoginBtn type="button" onClick={onKakaoLogin} disabled={isLoading}>
        <img src={kakao_logo} alt="Kakao" />
        Kakao로 시작하기
      </KakaoLoginBtn>
    </SocialButtonsContainer>
  )
}

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

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

const KakaoLoginBtn = styled.button`
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

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
