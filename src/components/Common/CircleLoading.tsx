import styled, { keyframes } from 'styled-components'

export default function CircleLoading() {
  return (
    <LoadingContainer>
      <Circle delay="0s" />
      <Circle delay="0.2s" />
      <Circle delay="0.4s" />
    </LoadingContainer>
  )
}

// 회전 애니메이션
const spin = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`

// 로딩 컴포넌트 스타일링
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface CircleProps {
  delay: string
}

const Circle = styled.div<CircleProps>`
  width: 6px;
  height: 6px;
  margin: 0 5px;
  background-color: #3498db; /* 원의 색상 */
  border-radius: 50%;
  animation: ${spin} 1s infinite ease-in-out;
  animation-delay: ${(props: { delay: string }) => props.delay};
`
