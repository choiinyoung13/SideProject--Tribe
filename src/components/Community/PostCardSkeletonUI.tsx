import styled from 'styled-components'

export default function PostCardSkeletonUI() {
  return (
    <SkeletonWrapper>
      <SkeletonBox /> {/* 이미지 */}
      <TextWrapper>
        <SkeletonText width="60%" height="20px" /> {/* 제목 */}
        <SkeletonText width="80%" height="20px" /> {/* 사용자 정보 */}
      </TextWrapper>
    </SkeletonWrapper>
  )
}

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: calc(25% - 15px);
  box-sizing: border-box;

  @media (max-width: 1600px) {
    width: calc(33.33% - 13.5px);
  }

  @media (max-width: 1300px) {
    width: calc(50% - 10.5px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
`

const SkeletonBox = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 유지 */
  position: relative;
  border-radius: 5%;
  background: #ddd;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SkeletonText = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #ddd;
  border-radius: 4px;
`
