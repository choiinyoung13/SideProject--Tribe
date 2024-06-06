import styled from 'styled-components'
import home_image from '../assets/images/home.jpg'
import home_image2 from '../assets/images/home2.jpg'
import home_image3 from '../assets/images/home3.jpg'
import Button from '../components/common/Button'
import InfinityMarquee from '../components/common/Marquee'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const firstSectionRef = useRef<HTMLElement | null>(null)
  const secondSectionRef = useRef<HTMLElement | null>(null)
  const thirdSectionRef = useRef<HTMLElement | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).style.opacity = '1'
        } else {
          ;(entry.target as HTMLElement).style.opacity = '0'
        }
      })
    })

    if (firstSectionRef.current) {
      observer.observe(firstSectionRef.current)
    }
    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current)
    }
    if (thirdSectionRef.current) {
      observer.observe(thirdSectionRef.current)
    }

    return () => {
      if (firstSectionRef.current) {
        observer.unobserve(firstSectionRef.current)
      }
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current)
      }
      if (thirdSectionRef.current) {
        observer.unobserve(thirdSectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        // Scrolling down
        if (
          secondSectionRef.current &&
          window.scrollY < secondSectionRef.current.offsetTop
        ) {
          window.scrollTo({
            top: secondSectionRef.current.offsetTop,
            behavior: 'instant',
          })
        } else if (
          thirdSectionRef.current &&
          window.scrollY < thirdSectionRef.current.offsetTop
        ) {
          window.scrollTo({
            top: thirdSectionRef.current.offsetTop,
            behavior: 'instant',
          })
        }
      } else if (window.scrollY < lastScrollY.current) {
        // Scrolling up
        if (
          secondSectionRef.current &&
          window.scrollY > secondSectionRef.current.offsetTop
        ) {
          window.scrollTo({
            top: secondSectionRef.current.offsetTop,
            behavior: 'instant',
          })
        } else if (firstSectionRef.current) {
          window.scrollTo({
            top: firstSectionRef.current.offsetTop,
            behavior: 'instant',
          })
        }
      }
      lastScrollY.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
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

        <Link to={'/shop'}>
          <Button hover={true} btnType="link">
            Tribe와 함께하기
          </Button>
        </Link>
        <Img src={home_image} alt="" draggable="false" />
      </FirstSection>
      <SecondSection ref={secondSectionRef}>
        <div>
          <span>" 002</span>
          <p>
            현대인들은 바쁜 일상 속에서 자연과의 연결을 찾고자 합니다.
            <br /> 식물을 통해 집이나 사무실 환경을 개선하고,
            <br /> 정신적인 안정과 힐링을 얻는 사람들이 늘어나고 있습니다.
            <br />
            그러나 식물의 구매, 관리, 교환 등에 있어 효율적인 플랫폼이 부족한
            상황입니다.
            <br />
            <br />
            "Tribe"는 간단하면서도 효과적인 식물 거래 및 커뮤니케이션 플랫폼을
            제공합니다.
            <br /> 주요 기능으로는 사용자가 식물을 사고팔 수 있는 거래 기능과
            식물 애호가들이
            <br /> 서로 정보를 공유하고 소통할 수 있는 커뮤니케이션 기능이
            있습니다.
            <br /> 이를 통해 사용자는 손쉽게 식물을 거래하고, 커뮤니티에서
            유용한 정보를 얻을 수 있습니다.
          </p>
        </div>
        <Img src={home_image2} alt="" draggable="false" />
      </SecondSection>
      <ThirdSection ref={thirdSectionRef}>
        <ThirdSectionTextCon>
          <InfinityMarquee />
        </ThirdSectionTextCon>
        <Img src={home_image3} alt="" draggable="false" />
      </ThirdSection>
    </HomeCon>
  )
}

const HomeCon = styled.div`
  width: 100%;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  max-width: 1902px;
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
    border: 2px solid rgba(20, 20, 20, 1);
  }
`

const SecondSection = styled.section`
  position: relative;
  opacity: 0;
  transition: all 1s ease;

  div {
    display: flex;
    position: absolute;
    bottom: 550px;
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

const ThirdSection = styled.section`
  position: relative;
  opacity: 0;
  transition: all 1s ease;
  width: 100%;
  height: 100vh;
`

const ThirdSectionTextCon = styled.div`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 150px;
`
