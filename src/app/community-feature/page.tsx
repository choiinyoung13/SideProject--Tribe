import community_feature_full from '@/assets/images/communityFeature/communityFeature_web_full.jpg'
import { assetSrc } from '@/shared/lib/asset'
import MobileHome from '@/components/MobileHome'
import MarqueeSection from './components/MarqueeSection'

export default function Page() {
  return (
    <div className="w-full h-screen relative bg-[#ebebed]">
      {/* Mobile (<= 600px) */}
      <div className="hidden max-[600px]:block">
        <MobileHome />
      </div>

      {/* Desktop (> 600px) */}
      <div className="block max-[600px]:hidden">
        <MarqueeSection />

        <div className="fixed z-[1] left-1/2 bottom-[30px] -translate-x-1/2 w-[100dvw] h-[100dvh]">
          <img
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover object-center w-full h-full"
            src={assetSrc(community_feature_full)}
            alt="배경 이미지"
            draggable="false"
          />
        </div>
      </div>
    </div>
  )
}
