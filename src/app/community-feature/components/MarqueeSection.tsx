'use client'

import { useState } from 'react'
import Button from '@/components/Common/Button'
import GuidelinesModal from '@/components/Common/GuidelinesModal'
import InfinityMarquee from './Marquee'
import Link from 'next/link'

export default function MarqueeSection() {
  const [isOnMouse, setIsOnMouse] = useState(false)
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false)

  return (
    <section className="fixed z-[2] left-0 right-0 top-0 bottom-0 max-[600px]:hidden">
      <div
        className="flex justify-center items-center absolute top-[170px] w-full h-[290px] [@media(min-height:1050px)]:h-[440px]"
        onMouseOver={() => setIsOnMouse(true)}
        onMouseOut={() => setIsOnMouse(false)}
      >
        <div
          className={`w-full min-w-[1800px] bg-[rgba(0,0,0,0)] ${
            isOnMouse ? 'opacity-0 z-[98]' : 'opacity-100 z-[100]'
          }`}
        >
          <InfinityMarquee />
        </div>
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-[99] w-[80%] flex justify-around transition-opacity duration-100 ease-in-out top-[10%] [@media(min-height:1050px)]:top-[18%] ${
            isOnMouse ? 'opacity-100' : 'opacity-0'
          } max-[970px]:flex-col max-[970px]:gap-[60px]`}
        >
          <div className="flex w-[520px] mr-[60px] min-w-[350px] max-[970px]:w-full max-[970px]:mr-0">
            <span className="flex-shrink-0 text-[1.7rem] font-[700] mr-[40px] min-w-[70px] max-[1024px]:text-[1.3rem] max-[1024px]:mr-[20px] max-[1024px]:leading-[1.5]">
              &quot; 003
            </span>
            <div className="text-[1.1rem] font-[300] leading-[38px] max-[1350px]:text-[0.9rem] max-[1350px]:leading-[34px] max-[970px]:w-full max-[970px]:leading-[30px] max-[768px]:max-w-[500px]">
              <p>
                Tribe 커뮤니티는 식물 애호가들의 지식과 경험을 나눌 수 있는 소통
                공간을 제공합니다. 커뮤니티 게시판은 식물 관리 팁, 질문과 답변
                등의 주제로 구성되어 있어, 자신의 경험을 공유하고 다른 사용자의
                도움을 받을 수 있습니다.
              </p>
              <div className="flex mt-[50px] max-[1024px]:mt-[20px] [&_button]:border-0 [&_button]:rounded-[2px] [&_button]:transition-[color] [&_button]:duration-300 [&_button]:ease-in-out max-[1024px]:[&_button]:text-[0.9rem] [&_a]:rounded-[6px] [&_a]:overflow-hidden">
                <Link href="/community">
                  <Button
                    colortype="black"
                    btntype="link"
                    hover={true.toString()}
                  >
                    커뮤니티 이용하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-[520px] min-w-[360px] max-[970px]:w-full">
            <span className="flex-shrink-0 text-[1.7rem] font-[700] mr-[40px] min-w-[70px] max-[1024px]:text-[1.3rem] max-[1024px]:mr-[20px] max-[1024px]:leading-[1.5]">
              &quot; 004
            </span>
            <div className="text-[1.1rem] font-[300] leading-[38px] max-[1350px]:text-[0.9rem] max-[1350px]:leading-[34px] max-[970px]:w-full max-[970px]:leading-[30px] max-[768px]:max-w-[500px]">
              <p>
                Tribe 커뮤니티는 모든 사용자가 쾌적하게 이용할 수 있도록
                커뮤니티 가이드라인을 제공하여 예의 바르고 존중하는 소통을
                권장합니다. 이를 통해 사용자는 안전하고 긍정적인 환경에서 식물에
                대한 열정을 공유할 수 있습니다.
              </p>
              <div className="flex mt-[50px] max-[1024px]:mt-[20px] [&_button]:border-0 [&_button]:rounded-[2px] [&_button]:transition-[color] [&_button]:duration-300 [&_button]:ease-in-out max-[1024px]:[&_button]:text-[0.9rem] [&_a]:rounded-[6px] [&_a]:overflow-hidden">
                <Button
                  colortype="black"
                  btntype="link"
                  hover={true.toString()}
                  onClick={() => setIsGuidelinesOpen(true)}
                >
                  커뮤니티 가이드라인
                </Button>
                {isGuidelinesOpen && (
                  <GuidelinesModal onClose={() => setIsGuidelinesOpen(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
