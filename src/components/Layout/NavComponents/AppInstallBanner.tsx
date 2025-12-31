import { ImInfo } from 'react-icons/im'

interface AppInstallBannerProps {
  menuOpen: boolean
}

export default function AppInstallBanner({
  menuOpen,
}: AppInstallBannerProps) {
  if (menuOpen) {
    return null
  }

  return (
    <div className="w-full hidden max-[600px]:flex justify-between items-center bg-[rgba(40,40,40,1)] text-white px-[18px] py-[14px] pl-[20px] text-[0.9rem]">
      <div className="flex items-center">
        <ImInfo size={17} />
        <span className="ml-[12px]">앱 설치하고 10% 추가 할인받기</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white text-[rgba(20,20,20,1)] px-[8px] py-[6px] text-[0.75rem] font-[600] rounded-[14px]">
          앱 설치
        </div>
      </div>
    </div>
  )
}
