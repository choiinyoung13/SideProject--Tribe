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
  width: 50%;
  min-width: 508px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0px;
  }
`;

const ImgWrapper = styled.section`
  width: 100%;

  img {
    width: 100%;
    max-width: 738px;
  }

  @media (max-width: 1024px) {
    img {
      max-width: 100%;
    }
  }
`;
