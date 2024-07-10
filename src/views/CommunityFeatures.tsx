import styled from "styled-components";
import community_feature_image from "../assets/images/communityFeature/communityFeature_web.jpg";
import community_feature_full from "../assets/images/communityFeature/communityFeature_web_full.jpg";
import community_feature_tablet1 from "../assets/images/communityFeature/communityFeature_tablet(horizontal).jpg";
import community_feature_tablet2 from "../assets/images/communityFeature/communityFeature_tablet(vertical).jpg";
import useWindowWidth from "../hooks/useWindowWidth";
import MobileHome from "./MobileHome";
import useWindowHeight from "../hooks/useWindowHeight";
import InfinityMarquee from "../components/Common/Marquee";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Common/Button";
import loadingIcon from "../assets/images/logo/ball-triangle.svg";

export default function CommunityFeatures() {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const [isOnMouse, setIsOnMouse] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (windowWidth <= 600) {
    return <MobileHome />;
  }

  return (
    <HomeCon>
      {!isImageLoaded && (
        <Loading>
          <img src={loadingIcon} alt="Loading..." />
        </Loading>
      )}
      <Section style={{ display: isImageLoaded ? "block" : "none" }}>
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
                  <Link to={"/community"}>
                    <Button
                      colortype="black"
                      btntype={"link"}
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
                  <Link to={"/community-guide"}>
                    <Button
                      colortype="black"
                      btntype={"link"}
                      hover={true.toString()}
                    >
                      커뮤니티 가이드라인
                    </Button>
                  </Link>
                </ButtonCon>
              </TextContentCon>
            </TextBox>
          </DetailText>
        </HoverableCon>
      </Section>
      <Img
        src={
          windowHeight >= 1080
            ? community_feature_full
            : windowWidth <= 768
            ? community_feature_tablet2
            : windowWidth <= 1024
            ? community_feature_tablet1
            : community_feature_image
        }
        alt=""
        draggable="false"
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? "block" : "none" }}
      />
    </HomeCon>
  );
}

const HomeCon = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Img = styled.img`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Section = styled.section`
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

interface HoverableConPropsType {
  windowheight: number;
}

const HoverableCon = styled.div<HoverableConPropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 170px;
  width: 100%;
  height: ${(props) => (props.windowheight >= 1050 ? "440px" : "290px")};
`;

interface TextConProps {
  isonmouse: string;
}

const TextCon = styled.div<TextConProps>`
  width: 100%;
  min-width: 1800px;
  z-index: ${(props) => (props.isonmouse === "true" ? "98" : "100")};
  background-color: #fff;
  opacity: ${(props) => (props.isonmouse === "true" ? "0" : "1")};
`;

interface DetailTextProps {
  isonmouse: string;
  windowheight: number;
}

const DetailText = styled.div<DetailTextProps>`
  position: absolute;
  top: ${(props) => (props.windowheight >= 1050 ? "18%" : "10%")};
  left: 18%;
  z-index: 99;
  width: 70%;
  display: flex;
  justify-content: space-around;
  opacity: ${(props) => (props.isonmouse === "true" ? "1" : "0")};
  transition: opacity 0.1s ease;

  @media (max-width: 1024px) {
    width: 80%;
    left: 10%;
    top: 10%;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    width: 80%;
    left: 10%;
    top: 10%;
    flex-direction: column;
  }
`;

const TextBox = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: 46%;
  min-width: 620px;

  &:nth-child(1) {
    border-right: 1px solid rgba(20, 20, 20, 1);
  }

  &:nth-child(2) {
    left: 620px;
    padding-left: 60px;
  }

  @media (max-width: 1024px) {
    width: 44%;
    min-width: 360px;

    &:nth-child(1) {
      border-right: none;
    }

    &:nth-child(2) {
      left: 460px;
      padding-left: 0px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 500px;
    left: 10px;

    &:nth-child(1) {
      border-right: none;
      top: -60px;
    }

    &:nth-child(2) {
      padding-left: 0px;
      left: 10px;
      top: 200px;
    }
  }

  @media (max-width: 600px) {
  }
`;

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
`;

const TextContentCon = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 38px;
  max-width: 430px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    max-width: 500px;
  }

  @media (max-width: 600px) {
  }
`;

const ButtonCon = styled.div`
  display: flex;
  margin-top: 50px;

  button {
    border: none;
    border-radius: 2px;
    transition: color 0.3s ease;
  }

  a {
    &:first-of-type {
      margin-right: 40px;
    }
  }

  @media (max-width: 1024px) {
    button {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    margin-top: 30px;

    button {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 600px) {
  }
`;

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
`;
