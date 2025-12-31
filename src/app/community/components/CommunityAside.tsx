'use client'

import FollowRecommends from './Community/FollowRecommends'
import RealTimeKeywords from './Community/RealTimeKeywords'
import { assetSrc } from '@/shared/lib/asset'
import type { UserInfoType } from '@/types/UserInfoType'

import aside_image from '@/assets/images/community/aside/user2.png'
import aside_image2 from '@/assets/images/community/aside/stats.png'

type Props = {
  recommends: UserInfoType[] | undefined
  isRecommendsLoading: boolean
  setInputValue: (v: string) => void
  setSearchKeyword: (v: string) => void
}

export function CommunityAside({
  recommends,
  isRecommendsLoading,
  setInputValue,
  setSearchKeyword,
}: Props) {
  return (
    <div className="sticky top-0 w-[320px] px-[22px] py-[30px] bg-white border-l border-[#e1e1e1] h-[calc(100vh-102px)] max-[1024px]:hidden">
      <div className="mb-[40px]">
        <div className="flex items-center mb-[16px] ml-[6px]">
          <img
            className="w-[18px] h-[18px]"
            src={assetSrc(aside_image2)}
            alt="aside image1"
            style={{ width: '16px', height: '18px' }}
          />
          <div className="text-[1.2rem] font-bold ml-[9px]">주간 인기 키워드</div>
        </div>
        <div className="bg-[#f4f4f4] p-[17px] rounded-[6px]">
          <div>
            <RealTimeKeywords
              setInputValue={setInputValue}
              setSearchKeyword={setSearchKeyword}
            />
          </div>
        </div>
      </div>

      <div className="mb-[40px]">
        <div className="flex items-center mb-[16px] ml-[6px]">
          <img className="w-[18px] h-[18px]" src={assetSrc(aside_image)} alt="aside image2" />
          <div className="text-[1.2rem] font-bold ml-[9px]">이웃 추천</div>
        </div>
        <div className="bg-[#f4f4f4] p-[17px] rounded-[6px]">
          <div>
            <FollowRecommends
              isRecommendsLoading={isRecommendsLoading}
              recommends={recommends}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
