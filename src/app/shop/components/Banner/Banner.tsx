'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import banner1 from '@/assets/images/banner/banner_image_1.jpg'
import banner2 from '@/assets/images/banner/banner_image_2.jpg'
import banner3 from '@/assets/images/banner/banner_image_3.jpg'
import 'swiper/css'
import 'swiper/css/navigation'
import { assetSrc } from '@/shared/lib/asset'
import './Banner.css'

export default function Banner() {
  const slideHeight = 'h-[400px]'

  return (
    <Swiper
      className="h-[400px]"
      draggable={false}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
    >
      <SwiperSlide draggable={false}>
        <div
          style={{ backgroundColor: 'rgba(34, 34, 34, 1)' }}
          className={`flex justify-center items-center w-full overflow-hidden ${slideHeight}`}
        >
          <img
            draggable={false}
            src={assetSrc(banner1)}
            alt="Banner 1"
            className="w-auto object-center"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide draggable={false}>
        <div
          className={`flex justify-center items-center w-full overflow-hidden ${slideHeight}`}
          style={{ backgroundColor: 'rgba(142, 147, 157, 1)' }}
        >
          <img
            src={assetSrc(banner2)}
            alt="Banner 2"
            className="w-auto object-center"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide draggable={false}>
        <div
          className={`flex justify-center items-center w-full overflow-hidden ${slideHeight}`}
          style={{ backgroundColor: 'rgba(216, 223, 227, 1)' }}
        >
          <img
            src={assetSrc(banner3)}
            alt="Banner 3"
            className="w-auto object-center"
          />
        </div>
      </SwiperSlide>
      <div className="banner-nav swiper-button-prev absolute top-1/2 w-[40px] mt-[-20px] z-[10] cursor-pointer flex justify-center items-center left-[40px] max-[600px]:left-[20px]" />
      <div className="banner-nav swiper-button-next absolute top-1/2 w-[40px] mt-[-20px] z-[10] cursor-pointer flex justify-center items-center right-[40px] max-[600px]:right-[20px]" />
    </Swiper>
  )
}
