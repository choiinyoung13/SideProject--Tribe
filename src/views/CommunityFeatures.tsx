import { useState } from 'react'
import styled from 'styled-components'
import community_feature_full from '../assets/images/communityFeature/communityFeature_web_full.jpg'
import useWindowWidth from '../hooks/useWindowWidth'
import MobileHome from './MobileHome'
import useWindowHeight from '../hooks/useWindowHeight'
import InfinityMarquee from '../components/Common/Marquee'
import { Link } from 'react-router-dom'
import Button from '../components/Common/Button'
import loadingIcon from '../assets/images/logo/ball-triangle.svg'
import GuidelinesModal from '../components/Community-features/GuidelinesModal'

export default function CommunityFeatures() {
  const windowWidth = useWindowWidth()
  const windowHeight = useWindowHeight()
  const [isOnMouse, setIsOnMouse] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  if (windowWidth <= 600) {
    return <MobileHome />
  }

  return (
    <CommunityFeaturesCon>
      {!isImageLoaded && (
        <Loading>
          <img src={loadingIcon} alt="Loading..." />
        </Loading>
      )}
      <Section style={{ display: isImageLoaded ? 'block' : 'none' }}>
        <HoverableCon
          windowheight={windowHeight}
          onMouseOver={() => setIsOnMouse(true)}
          onMouseOut={() => setIsOnMouse(false)}
        >
          <TextCon isonmouse={isOnMouse.toString()}>
            <InfinityMarquee />
          </TextCon>
          <DetailText
            isonmouse={isOnMouse.toString()}
            windowheight={windowHeight}
          >
            <TextBox>
              <TextNumber>" 003</TextNumber>
              <TextContentCon>
                <p>
                  Tribe 커뮤니티는 식물 애호가들의 지식과 경험을 나눌 수 있는
                  소통 공간을 제공합니다. 커뮤니티 게시판은 식물 관리 팁, 질문과
                  답변 등의 주제로 구성되어 있어, 자신의 경험을 공유하고 다른
                  사용자의 도움을 받을 수 있습니다.
                </p>
                <ButtonCon>
                  <Link to={'/community'}>
                    <Button
                      colortype="black"
                      btntype={'link'}
                      hover={true.toString()}
                    >
                      커뮤니티 이용하기
                    </Button>
                  </Link>
                </ButtonCon>
              </TextContentCon>
            </TextBox>

            <TextBox>
              <TextNumber>" 004</TextNumber>
              <TextContentCon>
                <p>
                  Tribe 커뮤니티는 모든 사용자가 쾌적하게 이용할 수 있도록
                  커뮤니티 가이드라인을 제공하여 예의 바르고 존중하는 소통을
                  권장합니다. 이를 통해 사용자는 안전하고 긍정적인 환경에서
                  식물에 대한 열정을 공유할 수 있습니다.
                </p>
                <ButtonCon>
                  <Button
                    colortype="black"
                    btntype={'link'}
                    hover={true.toString()}
                    onClick={openModal} // 모달 열기 버튼
                  >
                    커뮤니티 가이드라인
                  </Button>
                </ButtonCon>
              </TextContentCon>
            </TextBox>
          </DetailText>
        </HoverableCon>
      </Section>
      <ImgSection>
        <Img
          src={community_feature_full}
          alt=""
          draggable="false"
          onLoad={() => setIsImageLoaded(true)}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
        />
      </ImgSection>

      {/* 모달 컴포넌트 렌더링 */}
      {isModalOpen && <GuidelinesModal onClose={closeModal} />}
    </CommunityFeaturesCon>
  )
}

const CommunityFeaturesCon = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #ebebed;
`

const ImgSection = styled.div`
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  width: 100dvw;
  height: 100dvh;
`

const Img = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  object-position: center;
`

const Section = styled.section`
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

interface HoverableConPropsType {
  windowheight: number
}

const HoverableCon = styled.div<HoverableConPropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 170px;
  width: 100%;
  height: ${props => (props.windowheight >= 1050 ? '440px' : '290px')};
`

interface TextConProps {
  isonmouse: string
}

const TextCon = styled.div<TextConProps>`
  width: 100%;
  min-width: 1800px;
  z-index: ${props => (props.isonmouse === 'true' ? '98' : '100')};
  background-color: rgba(0, 0, 0, 0);
  opacity: ${props => (props.isonmouse === 'true' ? '0' : '1')};
`

interface DetailTextProps {
  isonmouse: string
  windowheight: number
}

const DetailText = styled.div<DetailTextProps>`
  position: absolute;
  top: ${props => (props.windowheight >= 1050 ? '18%' : '10%')};
  left: 0;
  z-index: 99;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  opacity: ${props => (props.isonmouse === 'true' ? '1' : '0')};
  transition: opacity 0.1s ease;

  @media (max-width: 970px) {
    flex-direction: column;
    gap: 60px;
  }
`

const TextBox = styled.div`
  display: flex;
  width: 520px;

  &:nth-child(1) {
    margin-right: 60px;
    min-width: 350px;
  }

  &:nth-child(2) {
    min-width: 360px;
  }

  @media (max-width: 970px) {
    width: 100%;
  }
`

const TextNumber = styled.span`
  font-size: 1.7rem;
  font-weight: 700;
  margin-right: 40px;
  min-width: 70px;

  @media (max-width: 1024px) {
    font-size: 1.3rem;
    margin-right: 20px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`

const TextContentCon = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 38px;

  @media (max-width: 1350px) {
    font-size: 0.9rem;
    line-height: 34px;
  }

  @media (max-width: 970px) {
    width: 100%;
    line-height: 30px;
  }

  @media (max-width: 768px) {
    max-width: 500px;
  }
`

const ButtonCon = styled.div`
  display: flex;
  margin-top: 50px;

  button {
    border: none;
    border-radius: 6px;
    transition: color 0.3s ease;
  }

  @media (max-width: 1024px) {
    button {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 970px) {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    margin-top: 30px;

    button {
      font-size: 0.8rem;
    }
  }
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100; /* Make sure it appears above other content */
  background-color: #fff; /* Optional: add a background color */

  img {
    width: 10%; /* Adjust size as needed */
  }
`
