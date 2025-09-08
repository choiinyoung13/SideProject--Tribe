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
  display: flex;
  align-items: center;
  width: 50%;
  min-width: 508px;

  @media (max-width: 1750px) {
    align-items: start;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    padding: 0px;
  }
`;

const ImgWrapper = styled.section`
  width: 100%;
  img {
    max-width: 100%;
  }

  @media (max-width: 1980px) {
    width: 100%;
  }
`;
