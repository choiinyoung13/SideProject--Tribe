'use client'

import { useEffect, useRef, useState } from 'react'

import login_image from '@/assets/images/logo/login_web_1.jpg'
import loadingIcon from '@/assets/images/logo/ball-triangle.svg'
import { assetSrc } from '@/shared/lib/asset'

export default function LoginImageSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // 캐시된 이미지의 onLoad가 hydration 전에 이미 끝나버리는 케이스 대비
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsImageLoaded(true)
    }
  }, [])

  return (
    <div className="hidden min-[1000px]:block w-1/2 h-screen min-h-[900px] overflow-hidden relative">
      {!isImageLoaded && (
        <div className="flex justify-center items-center h-screen w-full absolute top-0 left-0 z-[100] bg-white">
          <img className="w-[10%]" src={assetSrc(loadingIcon)} alt="Loading..." />
        </div>
      )}
      <img
        ref={imgRef}
        className={[
          'w-full h-full object-cover transition-opacity duration-300',
          isImageLoaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        src={assetSrc(login_image)}
        alt=""
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  )
}


