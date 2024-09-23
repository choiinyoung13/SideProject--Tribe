import styled, { keyframes } from 'styled-components'

// 스피너 컴포넌트

interface SpinnerType {
  width?: number
  height?: number
}

export default function Spinner({ width, height }: SpinnerType) {
  return <SpinnerWrapper width={width} height={height} />
}

// 스피너 회전 애니메이션
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

interface SpinnerWrapperProps {
  width?: number
  height?: number
}

// 스피너 스타일 컴포넌트
const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  display: inline-block;
  margin: 0 auto;
  width: ${props => (props.width ? `${props.width}px` : '28px')};
  height: ${props => (props.height ? `${props.height}px` : '28px')};
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: rgba(255, 255, 255, 1); /* 스피너 상단 색상 */
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
`
