import styled from 'styled-components'
import home_mobile_image from '../assets/images/home_mobile_1.jpg'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'
import { RiInstagramFill } from 'react-icons/ri'
import { FaSquareFacebook, FaYoutube } from 'react-icons/fa6'

export default function MobileHome() {
  return (
    <MoblieHomeCon>
      <MoblieSection>
        <MoblieImg src={home_mobile_image} alt="" draggable="false" />
      </MoblieSection>
    </MoblieHomeCon>
  )
}

const MoblieHomeCon = styled.div`
  width: 100%;
  overflow: hidden;
`

const MoblieImg = styled.img`
  width: 414px;
`

const MoblieSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &:nth-child(3) {
    height: 100vh;
  }
`

const MoblieTextBox = styled.div`
  display: flex;
  position: absolute;
  top: 190px;
  left: 30px;

  p {
    line-height: 26px;
    font-size: 0.7rem;
    color: rgba(50, 50, 50, 1);
  }

  &:nth-child(2) {
    top: 700px;
  }
`

const SocialLinks = styled.section`
  position: absolute;
  bottom: 180px;
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
`

const HoverableCon = styled.div``

interface TextConProps {
  isOnMouse: boolean
}

const TextCon = styled.div<TextConProps>`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
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
  z-index: 99;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  opacity: ${props => (props.isOnMouse ? '1' : '0')};
  transition: opacity 0.5s ease;
`

const Detail = styled.div`
  position: relative;
  min-width: 500px;
  height: 210px;
  display: flex;

  &:first-of-type {
    border-right: 1px solid rgba(20, 20, 20, 1);
    margin-right: 60px;
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
    display: flex;
    flex-direction: column;
    margin-left: 70px;
  }

  button {
    position: absolute;
    bottom: 0px;
    left: 150px;
  }
`
