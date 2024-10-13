import styled from 'styled-components'

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
`

const SkeletonBox = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 */
  position: relative;
  background: #ddd;
  background-size: 200px 100%;
  border-radius: 20px;
`

const SkeletonText = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: 10px;
  background-color: #ddd;
  background-size: 200px 100%;
  border-radius: 4px;

  @media (max-width: 600px) {
    margin-top: 8px;
  }
`
