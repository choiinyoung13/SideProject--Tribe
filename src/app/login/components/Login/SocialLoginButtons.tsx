import google_logo from '@/assets/images/logo/logo_google.png'
import kakao_logo from '@/assets/images/logo/logo_kakao.png'
import { assetSrc } from '@/shared/lib/asset'

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void
  onKakaoLogin: () => void
  isLoading?: boolean
}

/**
 * 소셜 로그인 버튼 컴포넌트 - 소셜 로그인 로직 분리
 */
export const SocialLoginButtons = ({
  onGoogleLogin,
  onKakaoLogin,
  isLoading = false,
}: SocialLoginButtonsProps) => {
  return (
    <div className="flex flex-col w-full">
      <button
        className="text-[rgba(20,20,20,1)] bg-white p-[12px_20px] cursor-pointer border border-[rgba(200,200,200,1)] rounded-[6px] flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed max-[600px]:text-[0.9rem] max-[600px]:w-[85%] max-[600px]:m-[0_auto_14px]"
        type="button"
        onClick={onGoogleLogin}
        disabled={isLoading}
      >
        <img
          className="w-[20px] h-[20px] mr-[10px] max-[600px]:w-[16px] max-[600px]:h-[16px]"
          src={assetSrc(google_logo)}
          alt="Google"
        />
        Google로 시작하기
      </button>
      <button
        className="text-[rgba(20,20,20,1)] bg-[#fae100] p-[12px_20px] cursor-pointer border-0 rounded-[6px] flex items-center justify-center mt-[10px] mb-[20px] disabled:opacity-60 disabled:cursor-not-allowed max-[600px]:text-[0.9rem] max-[600px]:w-[85%] max-[600px]:m-[0_auto_10px]"
        type="button"
        onClick={onKakaoLogin}
        disabled={isLoading}
      >
        <img
          className="w-[20px] h-[20px] mr-[10px] max-[600px]:w-[16px] max-[600px]:h-[16px]"
          src={assetSrc(kakao_logo)}
          alt="Kakao"
        />
        Kakao로 시작하기
      </button>
    </div>
  )
}

