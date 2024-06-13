import styled from 'styled-components'
import home_image from '../assets/images/home_web.jpg'
import home_image_full from '../assets/images/home_web_full.jpg'
import home_tablet_image from '../assets/images/home_tablet.jpg'
import Button from '../components/Common/Button'
import InfinityMarquee from '../components/Common/Marquee'
import useWindowWidth from '../hooks/useWindowWidth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiInstagramFill } from 'react-icons/ri'
import { FaSquareFacebook, FaYoutube } from 'react-icons/fa6'
import MobileHome from './MobileHome'
import useWindowHeight from '../hooks/useWindowHeight'

export default function Home() {
  const [isOnMouse, setIsOnMouse] = useState(false)

  const windowWidth = useWindowWidth()
  const windowHeight = useWindowHeight()

  console.log(windowWidth)
  console.log(windowHeight)

  if (windowWidth <= 600) {
    return <MobileHome />
  }

  return (
    <HomeCon>
      <Section></Section>
      <Img
        src={windowHeight >= 1080 ? home_image_full : home_image}
        alt=""
        draggable="false"
      />
    </HomeCon>
  )
}

const HomeCon = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;

  @media (max-width: 1026px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`

const Section = styled.section`
  position: absolute;
  top: 0;
  z-index: 60;
  width: 100%;
  height: 100vh;

  @media (max-width: 1026px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`

const TextBox = styled.div`
  display: flex;
  position: absolute;
  top: 570px;
  left: 40px;
  width: 900px;

  span {
    margin-right: 55px;
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

  @media (max-width: 600px) {
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
  top: 720px;
  left: 175px;
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
  }
`
