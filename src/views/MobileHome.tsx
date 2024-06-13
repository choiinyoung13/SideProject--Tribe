import styled from "styled-components";
import home_mobile_image from "../assets/images/home/home_mobile.jpg";

export default function MobileHome() {
  return (
    <MoblieHomeCon>
      <MoblieSection>
        <MoblieImg src={home_mobile_image} alt="" draggable="false" />
      </MoblieSection>
    </MoblieHomeCon>
  );
}

const MoblieHomeCon = styled.div`
  width: 100%;
  overflow: hidden;
`;

const MoblieImg = styled.img`
  width: 100%;
`;

const MoblieSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &:nth-child(3) {
    height: 100vh;
  }
`;
