import home_image from '@/assets/images/home/home_web.jpg'
import { assetSrc } from '@/shared/lib/asset'
import MobileHome from '@/components/MobileHome'
import Button from '@/components/Common/Button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Mobile (<= 600px) */}
      <div className="hidden max-[600px]:block">
        <MobileHome />
      </div>

      {/* Desktop (> 600px) */}
      <div className="block max-[600px]:hidden w-full h-screen overflow-hidden">
        <section className="fixed z-[2] left-0 right-0 top-0 bottom-0">
          <div className="absolute top-[570px] max-[768px]:top-[500px] left-[60px] flex max-[1024px]:left-[40px]">
            <span className="text-[2rem] font-[700] mr-[40px] max-[768px]:text-[1.5rem] max-[768px]:mr-[30px]">
              &quot; 001
            </span>
            <div className="text-[1.1rem] font-[300] leading-[32px] max-[768px]:text-[1rem] [&_a]:rounded-[6px] [&_a]:overflow-hidden">
              <p>
                {' '}
                당신의 식물 파트너 Tribe에 오신걸 환영합니다. <br />
                Tribe의 다양한 서비스와 함께 당신의 삶을 더 푸르게 만들어보아요.
                <br />
                시작은 작은 식물 하나에서부터입니다.
              </p>
              <div className="flex mt-[90px] max-[768px]:mt-[70px] [&_button]:border-0 [&_button]:rounded-[2px] [&_button]:transition-[color] [&_button]:duration-300 [&_button]:ease-in-out max-[768px]:[&_button]:text-[0.9rem] [&_a:first-of-type]:mr-[40px]">
                <Link href="/about">
                  <Button
                    colortype="black"
                    btntype="link"
                    hover={true.toString()}
                  >
                    ABOUT TRIBE
                  </Button>
                </Link>
                <Link href="/community-feature">
                  <Button
                    colortype="black"
                    btntype="link"
                    hover={true.toString()}
                  >
                    ABOUT COMMUNITY
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <img
          className="fixed z-[1] left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-left"
          src={assetSrc(home_image)}
          alt=""
          draggable="false"
        />
      </div>
    </div>
  )
}
