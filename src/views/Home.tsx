import styled from "styled-components";
import home_image from "../assets/images/home/home_web.jpg";
import home_image_tablet1 from "../assets/images/home/home_tablet(horizontal).jpg";
import home_image_tablet2 from "../assets/images/home/home_tablet(vertical).jpg";
import home_image_full from "../assets/images/home/home_web_full.jpg";
import useWindowWidth from "../hooks/useWindowWidth";
import { Link } from "react-router-dom";
import MobileHome from "./MobileHome";
import useWindowHeight from "../hooks/useWindowHeight";
import Button from "../components/common/Button";

export default function Home() {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  console.log(windowWidth);
  console.log(windowHeight);

  if (windowWidth <= 600) {
    return <MobileHome />;
  }

  return (
    <HomeCon>
      <Section>
        <TextBox windowHeight={windowHeight}>
          <TextNumber>" 001</TextNumber>
          <TextContentCon>
            <p>
              {" "}
              당신의 식물 파트너 Tribe에 오신걸 환영합니다. <br />
              Tribe의 다양한 서비스와 함께 당신의 삶을 더 푸르게 만들어보아요.
              <br />
              시작은 작은 식물 하나에서부터입니다.
            </p>
            <ButtonCon>
              <Link to={"/about"}>
                <Button btnType={"link"} hover={true}>
                  ABOUT TRIBE
                </Button>
              </Link>
              <Link to={"/community-feature"}>
                <Button btnType={"link"} hover={true}>
                  ABOUT COMMUNITY
                </Button>
              </Link>
            </ButtonCon>
          </TextContentCon>
        </TextBox>
      </Section>
      <Img
        src={
          windowHeight >= 1080
            ? home_image_full
            : windowWidth <= 768
            ? home_image_tablet2
            : windowWidth <= 1024
            ? home_image_tablet1
            : home_image
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
  windowHeight: number;
}

const TextBox = styled.div<TextBoxPropsType>`
  position: absolute;
  top: ${(props) => (props.windowHeight >= 1050 ? "700px" : "570px")};
  left: 60px;
  display: flex;

  @media (max-width: 1024px) {
    left: 40px;
  }

  @media (max-width: 768px) {
    top: 500px;
  }

  @media (max-width: 600px) {
  }
`;

const TextNumber = styled.span`
  font-size: 2rem;
  font-weight: 700;
  margin-right: 40px;

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

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonCon = styled.div`
  display: flex;
  margin-top: 80px;
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

  @media (max-width: 768px) {
    margin-top: 140px;

    button {
      font-size: 0.9rem;
    }
  }
`;
