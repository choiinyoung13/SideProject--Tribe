import styled, { keyframes } from 'styled-components'

export default function PostCardSkeletonUI() {
  return (
    <SkeletonWrapper>
      <SkeletonBox /> {/* 이미지 */}
      <SkeletonText width="60%" height="18px" /> {/* 제목 */}
      <SkeletonText width="80%" height="16px" /> {/* 사용자 정보 */}
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

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: calc(25% - 15px);
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 1600px) {
    width: calc(33.33% - 13.5px);
  }

  @media (max-width: 1300px) {
    width: calc(50% - 10.5px);
  }

  @media (max-width: 768px) {
    width: calc(100% - 20px);
  }
`

const SkeletonBox = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 유지 */
  position: relative;
  border-radius: 10px;
  background: #ddd;
  background-image: linear-gradient(90deg, #ddd 25%, #e2e2e2 50%, #ddd 75%);
  background-size: 200px 100%;
  animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
`

const SkeletonText = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #ddd;
  background-image: linear-gradient(90deg, #ddd 25%, #e2e2e2 50%, #ddd 75%);
  background-size: 200px 100%;
  animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
  border-radius: 4px;
`
