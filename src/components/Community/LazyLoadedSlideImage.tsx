import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export default function LazyLoadedSlideImage({
  src,
  alt,
  setIsImageLoading,
  preloadNextImageSrc,
}: {
  src: string
  alt: string
  setIsImageLoading: (value: boolean) => void
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

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  // 다음 이미지를 미리 로드하는 로직 추가
  useEffect(() => {
    if (preloadNextImageSrc) {
      const img = new Image()
      img.src = preloadNextImageSrc // 다음 슬라이드 이미지를 미리 로드
    }
  }, [preloadNextImageSrc])

  const handleLoaded = () => {
    setIsImageLoading(false)
    setIsLoaded(true)
  }

  return (
    <SlideImageContainer ref={imgRef}>
      {isInView && (
        <SlideImage
          src={src}
          alt={alt}
          onLoad={handleLoaded}
          isLoaded={isLoaded}
        />
      )}
    </SlideImageContainer>
  )
}

const SlideImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 100%; /* 1:1 비율 유지 */
  border-radius: 10px;
  overflow: hidden;
`

const SlideImage = styled.img<{ isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`
