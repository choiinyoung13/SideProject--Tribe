import styled from "styled-components";

interface ImageSectionProps {
  image: string;
}

export default function ImageSection({ image }: ImageSectionProps) {
  return (
    <ImgSection>
      <ImgWrapper>
        <img src={image} alt="" draggable={false} />
      </ImgWrapper>
    </ImgSection>
  );
}

const ImgSection = styled.section`
  width: 60%;
  min-width: 556px;
  max-width: 806px;
  height: 100%;
  padding: 0px 60px 0px 30px;

  @media (max-width: 1024px) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0px;
  }

  @media (max-width: 600px) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0px;
  }
`;

const ImgWrapper = styled.section`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }
`;
