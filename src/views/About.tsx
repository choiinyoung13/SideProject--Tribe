import styled from "styled-components";
import about_image from "../assets/images/about/about_web.jpg";
import about_image_full from "../assets/images/about/about_full.jpg";
import about_image_tablet1 from "../assets/images/about/about_tablet(horizontal).jpg";
import about_image_tablet2 from "../assets/images/about/about_tablet(vertical).jpg";
import useWindowWidth from "../hooks/useWindowWidth";
import MobileHome from "./MobileHome";
import useWindowHeight from "../hooks/useWindowHeight";
import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareFacebook, FaYoutube } from "react-icons/fa6";

export default function About() {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  if (windowWidth <= 600) {
    return <MobileHome />;
  }

  return (
    <HomeCon>
      <Section>
        <TextBox windowheight={windowHeight}>
          <TextNumber>" 002</TextNumber>
          <TextContentCon>
            <p>
              현대인들은 바쁜 일상 속에서 자연과의 연결을 찾고자 합니다.
              <br /> 식물을 통해 집이나 사무실 환경을 개선하고,
              <br /> 정신적인 안정과 힐링을 얻는 사람들이 늘어나고 있습니다.
              <br />
              그러나 식물의 구매, 관리, 교환 등에 있어 효율적인 플랫폼이 부족한
              상황입니다.
              <br />
              <span>
                <br />
                "Tribe"는 간단하면서도 효과적인 식물 거래 및 커뮤니케이션
                플랫폼을 제공합니다.
                <br /> 주요 기능으로는 사용자가 식물을 사고팔 수 있는 거래
                기능과 식물 애호가들이
                <br /> 서로 정보를 공유하고 소통할 수 있는 커뮤니케이션 기능이
                있습니다.
                <br /> 이를 통해 사용자는 손쉽게 식물을 거래하고, 커뮤니티에서
                유용한 정보를 얻을 수 있습니다.
              </span>
            </p>
            <SocialLinks>
              <Link to={"https://www.instagram.com/"}>
                <RiInstagramFill />
              </Link>
              <Link to={"https://www.facebook.com/?locale=ko_KR"}>
                <FaSquareFacebook />
              </Link>
              <Link to={"https://www.youtube.com/"}>
                <FaYoutube />
              </Link>
            </SocialLinks>
          </TextContentCon>
        </TextBox>
      </Section>
      <Img
        src={
          windowHeight >= 1080
            ? about_image_full
            : windowWidth <= 768
            ? about_image_tablet2
            : windowWidth <= 1024
            ? about_image_tablet1
            : about_image
        }
        alt=""
        draggable="false"
      />
    </HomeCon>
  );
}

const HomeCon = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Img = styled.img`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`;

const Section = styled.section`
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

interface TextBoxPropsType {
  windowheight: number;
}

const TextBox = styled.div<TextBoxPropsType>`
  position: absolute;
  top: ${(props) => (props.windowheight >= 1050 ? "488px" : "394px")};
  left: 60px;
  display: flex;

  @media (max-width: 1024px) {
    top: 400px;
  }

  @media (max-width: 768px) {
    top: 425px;
  }

  @media (max-width: 600px) {
  }
`;

const TextNumber = styled.span`
  font-size: 2rem;
  font-weight: 700;
  min-width: 70px;
  margin-right: 40px;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 30px;
  }

  @media (max-width: 600px) {
  }
`;

const TextContentCon = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 32px;
  min-width: 550px;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    div {
      margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  margin-top: 68px;
  gap: 24px;

  a {
    font-size: 2.5rem;
    color: rgba(20, 20, 20, 1);
    transition: color 0.3s ease;

    &:nth-child(2) {
      font-size: 2.3rem;
    }

    &:hover {
      color: rgba(100, 100, 100, 1);
    }
  }

  @media (max-width: 1024px) {
    padding-top: 40px;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
  }
`;
