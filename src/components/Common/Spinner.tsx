import styled, { keyframes } from "styled-components";

// 스피너 회전 애니메이션
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 스피너 스타일 컴포넌트
const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: rgba(255, 255, 255, 1); /* 스피너 상단 색상 */
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
`;

// 스피너 컴포넌트
export default function Spinner() {
  return <SpinnerWrapper />;
}
