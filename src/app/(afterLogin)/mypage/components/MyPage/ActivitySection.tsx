'use client'

import { useSearchParams } from 'next/navigation'
import { LikedPostsSection } from './LikedPostsSection'
import { MyPostsSection } from './MyPostsSection'
import { PurchaseHistorySection } from './PurchaseHistorySection'

import { useNavigate } from '@/shared/routing/navigation'

export default function ActivitySection() {
  const searchParams = useSearchParams()
  const subTab = searchParams.get('subTab')
  const navigate = useNavigate()

  const tabClass = (selected: boolean) =>
    `py-[20px] text-[0.95rem] cursor-pointer hover:border-b-[2px] hover:border-black ${
      selected
        ? 'border-b-[2px] border-[rgba(0,0,0,1)] font-[700]'
        : 'border-b-0 font-[400]'
    } max-[1150px]:first:ml-[30px] max-[768px]:py-[16px] max-[768px]:text-[0.85rem]`

  return (
    <div className="w-full mx-auto bg-white">
      <header className="max-w-[1080px] mx-auto">
        <div className="flex w-full mx-auto border-b border-[rgba(230,230,230,1)] gap-[25px]">
          <div
            className={tabClass(subTab === null)}
            onClick={() => {
              navigate('/mypage?tab=1')
            }}
          >
            좋아요 누른 게시물
          </div>
          <div
            className={tabClass(subTab === '1')}
            onClick={() => {
              navigate('/mypage?tab=1&subTab=1')
            }}
          >
            내가 올린 게시물
          </div>
          <div
            className={tabClass(subTab === '2')}
            onClick={() => {
              navigate('/mypage?tab=1&subTab=2')
            }}
          >
            구매 내역
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1080px] flex max-[768px]:flex-col max-[768px]:w-full">
        {/* 좋아요 누른 게시물 */}
        {subTab === null && <LikedPostsSection />}
        {/* 내가 올린 게시물 */}
        {subTab === '1' && <MyPostsSection />}
        {/* 구매 내역 */}
        {subTab === '2' && <PurchaseHistorySection />}
      </main>
    </div>
  )
}
