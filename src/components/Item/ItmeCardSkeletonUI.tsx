import styled, { keyframes } from 'styled-components'

export default function ItmeCardSkeletonUI() {
  return (
    <SkeletonWrapper>
      {/* 스켈레톤 이미지 */}
      <SkeletonBox />
      {/* 스켈레톤 텍스트 (아이템 제목, 배지 영역 등) */}
      <SkeletonText width="60%" height="18px" /> {/* 제목 */}
      <SkeletonText width="40%" height="16px" /> {/* 카테고리 */}
      <SkeletonText width="80%" height="16px" /> {/* 가격 */}
      <SkeletonText width="40%" height="16px" /> {/* 할인 정보 */}
    </SkeletonWrapper>
  )
}

const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

// 스켈레톤 이미지와 텍스트 블록
const SkeletonWrapper = styled.div`
  position: relative;
  width: 20%;
  padding: 0px 12px 26px;

  @media (max-width: 1600px) {
    width: 25%;
  }

  @media (max-width: 1300px) {
    width: 33.33%;
  }

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`

const SkeletonBox = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 */
  position: relative;
  background-color: #ddd;
  background-image: linear-gradient(90deg, #ddd 25%, #e2e2e2 50%, #ddd 65%);
  background-size: 200px 100%;
  animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
  border-radius: 20px;
`

const SkeletonText = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: 10px;
  background-color: #ddd;
  background-image: linear-gradient(90deg, #ddd 25%, #e2e2e2 50%, #ddd 65%);
  background-size: 200px 100%;
  animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
  border-radius: 4px;

  @media (max-width: 600px) {
    margin-top: 8px;
  }
`
