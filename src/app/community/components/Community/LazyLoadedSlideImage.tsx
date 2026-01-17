import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function LazyLoadedSlideImage({
  src,
  alt,
  preloadNextImageSrc,
}: {
  src: string
  alt: string
  preloadNextImageSrc?: string
}) {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true) // 이미지가 뷰포트 근처에 도달했을 때 로드 시작
            observer.disconnect() // 한 번 로드 후 해제
          }
        })
      },
      {
        rootMargin: '500px', // 뷰포트보다 500px 앞서 로드 시작
        threshold: 0.1,
      }
    )

    const node = imgRef.current
    if (node) {
      observer.observe(node)
    }

    return () => {
      if (node) {
        observer.unobserve(node)
      }
    }
  }, [])

  // 다음 이미지를 미리 로드하는 로직 추가
  useEffect(() => {
    if (preloadNextImageSrc) {
      const img = new window.Image()
      img.src = preloadNextImageSrc // 다음 슬라이드 이미지를 미리 로드
    }
  }, [preloadNextImageSrc])

  const handleLoaded = () => {
    setIsLoaded(true)
  }

  return (
    <div
      className="relative w-full h-full rounded-[10px] overflow-hidden bg-gray-100"
      ref={imgRef}
    >
      {isInView && (
        <Image
          className={`object-contain rounded-[10px] transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          onLoad={handleLoaded}
          unoptimized={!src.startsWith('http')}
        />
      )}
    </div>
  )
}
