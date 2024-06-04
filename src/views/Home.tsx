import styled from 'styled-components'
import home_image from '../assets/images/home.jpg'
import home_image2 from '../assets/images/home2.jpg'
import Button from '../components/common/Button'
import { useEffect, useRef } from 'react'

export default function Home() {
  const firstSectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (firstSectionRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
          } else {
            ;(entry.target as HTMLElement).style.opacity = '0'
          }
        })
      })
      observer.observe(firstSectionRef.current)

      return () => {
        if (firstSectionRef.current) {
          observer.unobserve(firstSectionRef.current)
        }
      }
    }
  }, [])

  return (
    <HomeCon>
      <FirstSection ref={firstSectionRef}>
        <div>
          <span>" 001</span>
          <p>
            당신의 식물 파트너 Tribe에 오신걸 환영합니다. <br />
            Tribe의 다양한 서비스와 함께 지구와 당신의 삶을 더 푸르게
            만들어보아요.
            <br />
            시작은 작은 식물 하나에서부터입니다.
          </p>
        </div>
        <Button hover={true} btnType="link">
          Tribe와 함께하기
        </Button>
        <Img src={home_image} alt="" draggable="false" />
      </FirstSection>
      <SecondSection>
        <div>
          <span>" 002</span>
          <p>
            당신의 식물 파트너 Tribe에 오신걸 환영합니다. <br />
            Tribe의 다양한 서비스와 함께 지구와 당신의 삶을 더 푸르게
            만들어보아요.
            <br />
            당신의 식물 파트너 Tribe에 오신걸 환영합니다.
            <br />
            시작은 작은 식물 하나에서부터입니다.
            <br />
            <br />
            <br />
            당신의 식물 파트너 Tribe에 오신걸 환영합니다. <br />
            Tribe의 다양한 서비스와 함께 지구와 당신의 삶을 더 푸르게
            만들어보아요.
            <br />
            시작은 작은 식물 하나에서부터입니다.
          </p>
        </div>
        <Img src={home_image2} alt="" draggable="false" />
      </SecondSection>
    </HomeCon>
  )
}

const HomeCon = styled.div`
  width: 100%;
  height: 3000px;
`

const Img = styled.img`
  width: 1902px;
`

const FirstSection = styled.section`
  position: relative;
  width: 100%;
  height: 105vh;
  overflow: hidden;
  opacity: 0;
  transition: all 1.5s ease;

  div {
    display: flex;
    position: absolute;
    bottom: 280px;
    left: 40px;

    span {
      margin-right: 100px;
      font-size: 2rem;
      font-weight: bold;
    }

    p {
      line-height: 30px;
      font-size: 1rem;
    }
  }

  button {
    position: absolute;
    bottom: 180px;
    left: 220px;
  }
`

const SecondSection = styled.section`
  position: relative;

  div {
    display: flex;
    position: absolute;
    bottom: 600px;
    left: 40px;

    span {
      margin-right: 100px;
      font-size: 2rem;
      font-weight: bold;
    }

    p {
      line-height: 30px;
      font-size: 1rem;
    }
  }
`
