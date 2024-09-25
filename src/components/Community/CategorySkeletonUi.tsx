import styled from "styled-components";

export function CategorySkeletonUi() {
  return (
    <SkeletonWrapper>
      <SkeletonBox />
      <SkeletonBox />
      <SkeletonBox />
      <SkeletonBox />
      <SkeletonBox />
      <SkeletonBox />
      <SkeletonBox />
    </SkeletonWrapper>
  );
}

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const SkeletonBox = styled.div`
  width: 140px;
  height: 24px;
  background-color: #f4f4f4;
`;
