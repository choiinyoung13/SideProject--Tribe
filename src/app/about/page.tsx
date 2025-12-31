import { RiInstagramFill } from 'react-icons/ri'
import { FaSquareFacebook, FaYoutube } from 'react-icons/fa6'
import about_image from '@/assets/images/about/about_web.jpg'
import { assetSrc } from '@/shared/lib/asset'
import MobileHome from '@/components/MobileHome'

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
          <div className="absolute top-[394px] max-[1024px]:top-[400px] max-[768px]:top-[425px] left-[60px] flex">
            <span className="text-[2rem] font-[700] min-w-[70px] mr-[40px] max-[1024px]:text-[1.8rem] max-[768px]:text-[1.5rem] max-[768px]:mr-[30px]">
              &quot; 002
            </span>
            <div className="text-[1.1rem] font-[300] leading-[32px] min-w-[550px] max-[1024px]:text-[0.9rem]">
              <p>
                현대인들은 바쁜 일상 속에서 자연과의 연결을 찾고자 합니다.
                <br /> 식물을 통해 집이나 사무실 환경을 개선하고,
                <br /> 정신적인 안정과 힐링을 얻는 사람들이 늘어나고 있습니다.
                <br />
                그러나 식물의 구매, 관리, 교환 등에 있어 효율적인 플랫폼이
                부족한 상황입니다.
                <br />
                <span>
                  <br />
                  &quot;Tribe&quot;는 간단하면서도 효과적인 식물 거래 및
                  커뮤니케이션 플랫폼을 제공합니다.
                  <br /> 주요 기능으로는 사용자가 식물을 사고팔 수 있는 거래
                  기능과 식물 애호가들이
                  <br /> 서로 정보를 공유하고 소통할 수 있는 커뮤니케이션 기능이
                  있습니다.
                  <br /> 이를 통해 사용자는 손쉽게 식물을 거래하고, 커뮤니티에서
                  유용한 정보를 얻을 수 있습니다.
                </span>
              </p>
              <div className="flex items-center mt-[68px] gap-[24px] max-[1024px]:pt-[40px] [&_a]:text-[2.5rem] [&_a]:text-[rgba(20,20,20,1)] [&_a]:transition-[color] [&_a]:duration-300 [&_a]:ease-in-out [&_a:nth-child(2)]:text-[2.3rem] [&_a:hover]:text-[rgba(100,100,100,1)]">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <RiInstagramFill />
                </a>
                <a
                  href="https://www.facebook.com/?locale=ko_KR"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaSquareFacebook />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </section>

        <img
          className="fixed z-[1] left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-left"
          src={assetSrc(about_image)}
          alt=""
          draggable="false"
        />
      </div>
    </div>
  )
}
