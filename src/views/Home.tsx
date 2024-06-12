import styled from 'styled-components'
import home_image from '../assets/images/home_web_1.jpg'
import home_image2 from '../assets/images/home_web_2.jpg'
import home_image3 from '../assets/images/home_web_3.jpg'
import home_tablet_image1 from '../assets/images/home_tablet_1.jpg'
import home_tablet_image2 from '../assets/images/home_tablet_2.jpg'
import home_tablet_image3 from '../assets/images/home_tablet_3.jpg'
import Button from '../components/Common/Button'
import InfinityMarquee from '../components/Common/Marquee'
import useWindowWidth from '../hooks/useWindowWidth'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiInstagramFill } from 'react-icons/ri'
import { FaSquareFacebook, FaYoutube } from 'react-icons/fa6'
import MobileHome from './MobileHome'

export default function Home() {
  const firstSectionRef = useRef<HTMLElement | null>(null)
  const secondSectionRef = useRef<HTMLElement | null>(null)
  const thirdSectionRef = useRef<HTMLElement | null>(null)
  const [isOnMouse, setIsOnMouse] = useState(false)
  const lastScrollY = useRef(0)

  const windowWidth = useWindowWidth()

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

  if (windowWidth <= 414) {
    return <MobileHome />
  }

  return (
    <HomeCon>
      <Section ref={firstSectionRef}>
        <TextBox>
          <span>" 001</span>
          <p>
            당신의 식물 파트너 Tribe에 오신걸 환영합니다. <br />
            Tribe의 다양한 서비스와 함께 당신의 삶을 더 푸르게 만들어보아요.
            <br />
            시작은 작은 식물 하나에서부터입니다.
          </p>
        </TextBox>
        <Link to={'/shop'}>
          <Button hover={true} btnType="link">
            Tribe와 함께하기
          </Button>
        </Link>
        <Img
          src={windowWidth <= 768 ? home_tablet_image1 : home_image}
          alt=""
          draggable="false"
        />
      </Section>
      <Section ref={secondSectionRef}>
        <TextBox>
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
        </TextBox>
        <SocialLinks>
          <Link to={'https://www.instagram.com/'}>
            <RiInstagramFill />
          </Link>
          <Link to={'https://www.facebook.com/?locale=ko_KR'}>
            <FaSquareFacebook size={30} />
          </Link>
          <Link to={'https://www.youtube.com/'}>
            <FaYoutube />
          </Link>
        </SocialLinks>
        <Img
          src={windowWidth <= 768 ? home_tablet_image2 : home_image2}
          alt=""
          draggable="false"
        />
      </Section>
      <Section ref={thirdSectionRef}>
        <HoverableCon
          onMouseOver={() => setIsOnMouse(true)}
          onMouseOut={() => setIsOnMouse(false)}
        >
          <TextCon isOnMouse={isOnMouse}>
            <InfinityMarquee />
          </TextCon>
          <DetailText isOnMouse={isOnMouse}>
            <Detail>
              <span>" 003</span>
              <div>
                <p>
                  Tribe 커뮤니티는 식물 애호가들의 지식과 경험을 나눌 수 있는
                  소통 공간을 제공합니다. 커뮤니티 게시판은 식물 관리 팁, 질문과
                  답변 등의 주제로 구성되어 있어, 자신의 경험을 공유하고 다른
                  사용자의 도움을 받을 수 있습니다.
                </p>
                <Link to={'/community'}>
                  <Button hover={true} btnType="link">
                    커뮤니티 이용하기
                  </Button>
                </Link>
              </div>
            </Detail>
            <Detail>
              <span>" 004</span>
              <div>
                <p>
                  Tribe 커뮤니티는 모든 사용자가 쾌적하게 이용할 수 있도록
                  커뮤니티 가이드라인을 제공하여 예의 바르고 존중하는 소통을
                  권장합니다. 이를 통해 사용자는 안전하고 긍정적인 환경에서
                  식물에 대한 열정을 공유할 수 있습니다.
                </p>
                <Link to={'/community/guide'}>
                  <Button hover={true} btnType="link">
                    커뮤니티 가이드라인
                  </Button>
                </Link>
              </div>
            </Detail>
          </DetailText>
        </HoverableCon>
        <Img
          src={windowWidth <= 768 ? home_tablet_image3 : home_image3}
          alt=""
          draggable="false"
        />
      </Section>
    </HomeCon>
  )
}

const HomeCon = styled.div`
  width: 100%;
  overflow: hidden;
`

const Img = styled.img`
  width: 1902px;

  @media (max-width: 768px) {
    width: 768px;
  }

  @media (max-width: 414px) {
    margin-top: 70px;
  }
`

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 104vh;
  overflow: hidden;
  opacity: 0;
  transition: all 0.7s ease;

  &:nth-child(1) {
    button {
      position: absolute;
      top: 710px;
      left: 220px;
      border: none;
    }
  }

  &:nth-child(2) {
    div {
      top: 400px;
    }
  }

  &:nth-child(3) {
    height: 100vh;
  }

  @media (max-width: 768px) {
    &:nth-child(1) {
      button {
        position: absolute;
        top: 750px;
        left: 150px;
        font-size: 0.9rem;
        border: none;
      }
    }

    &:nth-child(2) {
      div {
        top: 450px;
      }
    }
  }

  @media (max-width: 414px) {
    button {
      position: absolute;
      bottom: 470px;
      left: 70px;
      border: none;
    }
  }
`

const TextBox = styled.div`
  display: flex;
  position: absolute;
  top: 570px;
  left: 40px;
  width: 900px;

  span {
    margin-right: 100px;
    font-size: 2rem;
    font-weight: bold;
  }

  p {
    line-height: 30px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    top: 610px;

    span {
      margin-right: 50px;
      font-size: 1.5rem;
      font-weight: bold;
    }

    p {
      line-height: 30px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 414px) {
    top: 350px;
    left: 20px;

    p {
      line-height: 24px;
      font-size: 0.7rem;
    }

    span {
      margin-right: 0px;
      font-size: 0.8rem;
      font-weight: bold;
      width: 50px;
      line-height: 24px;
    }
  }
`

const SocialLinks = styled.section`
  position: absolute;
  top: 730px;
  left: 222px;
  font-size: 32px;
  height: 40px;
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: rgba(20, 20, 20, 1);
  }

  @media (max-width: 768px) {
    top: 770px;
    left: 150px;
  }

  @media (max-width: 414px) {
  }
`

const HoverableCon = styled.div``

interface TextConProps {
  isOnMouse: boolean
}

const TextCon = styled.div<TextConProps>`
  overflow: hidden;
  white-space: nowrap;
  width: 1902px;
  box-sizing: border-box;
  position: absolute;
  top: 180px;
  z-index: ${props => (props.isOnMouse ? '98' : '100')};
  background-color: #fff;
  opacity: ${props => (props.isOnMouse ? '0' : '1')};
`

const DetailText = styled.div<TextConProps>`
  position: absolute;
  top: 200px;
  left: 300px;
  z-index: 99;
  width: 1300px;
  display: flex;
  justify-content: center;
  opacity: ${props => (props.isOnMouse ? '1' : '0')};
  transition: opacity 0.1s ease;

  @media (max-width: 768px) {
    width: 768px;
    left: 150px;
    top: 160px;
    flex-direction: column;
  }

  @media (max-width: 414px) {
  }
`

const Detail = styled.div`
  position: relative;
  min-width: 500px;
  height: 210px;
  display: flex;

  &:first-of-type {
    border-right: 1px solid rgba(20, 20, 20, 1);
    margin-right: 60px;
    margin-bottom: 30px;
    padding-right: 60px;
  }

  span {
    font-size: 2rem;
    font-weight: bold;
  }

  p {
    line-height: 30px;
    font-size: 1rem;
    margin-bottom: 50px;
    max-width: 400px;
  }

  div {
    margin-left: 70px;
  }

  button {
    position: absolute;
    top: 166px;
    left: 150px;
    border: none;
    span {
      font-size: 22px;
    }
  }

  @media (max-width: 768px) {
    span {
      font-size: 1.1rem;
      font-weight: bold;
      line-height: 26px;
    }

    p {
      line-height: 30px;
      font-size: 0.8rem;
      margin-bottom: 50px;
      max-width: 400px;
    }

    div {
      margin-left: 20px;
    }

    button {
      position: absolute;
      top: 114px;
      left: 60px;
      border: none;
      font-size: 0.7rem;
      span {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 414px) {
  }
`
