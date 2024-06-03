import styled from "styled-components";
import home_image from "../assets/images/home_img.webp";

export default function Home() {
  return (
    <HomeCon>
      <Img src={home_image} alt="" />
    </HomeCon>
  );
}

const HomeCon = styled.div`
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
`;
