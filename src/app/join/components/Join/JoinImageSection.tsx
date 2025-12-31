'use client'

import { useEffect, useRef, useState } from 'react'
import loadingIcon from '@/assets/images/logo/ball-triangle.svg'
import join_image from '@/assets/images/join_web_1.jpg'
import { assetSrc } from '@/shared/lib/asset'

/**
 * 회원가입 페이지 이미지 섹션 컴포넌트
 */
export const JoinImageSection = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // 캐시된 이미지는 onLoad가 hydration 전에 이미 끝나버리는 케이스 대비
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsImageLoaded(true)
    }
  }, [])

  return (
    <div className="hidden flex-1 min-[1000px]:block w-[520px] h-screen min-h-[900px] overflow-hidden relative flex-shrink-0">
      {!isImageLoaded && (
        <div className="flex justify-center items-center h-screen w-full absolute top-0 left-0 z-[100] bg-white [&_img]:w-[15%]">
          <img src={assetSrc(loadingIcon)} alt="Loading..." />
        </div>
      )}
      <img
        ref={imgRef}
        src={assetSrc(join_image)}
        alt="회원가입 페이지 이미지"
        onLoad={() => setIsImageLoaded(true)}
        className={[
          'w-full h-full object-cover transition-opacity duration-300',
          isImageLoaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />
    </div>
  )
}
