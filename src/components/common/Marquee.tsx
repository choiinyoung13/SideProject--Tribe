import Marquee from 'react-fast-marquee'
import styled from 'styled-components'

export default function InfinityMarquee() {
  const texts = [
    {
      text: '전문가의 도움이 필요해..',
      fontSize: '18px',
      fontWeight: 600,
      left: '170px',
      top: '20px',
    },
    {
      text: '저렴한 화분 어디 없을까?',
      fontSize: '40px',
      fontWeight: 'bold',
      left: '450px',
      top: '6px',
    },
    {
      text: '독특한 식물 어디 없을까?',
      fontSize: '28px',
      fontWeight: 600,
      right: '450px',
      top: '20px',
    },
    {
      text: '마음에 안정이 필요해!',
      fontSize: '44px',
      fontWeight: 'bold',
      right: '-40px',
      top: '10px',
    },
    {
      text: '이 가격이 맞나..?',
      fontSize: '60px',
      fontWeight: 'bold',
      left: '60px',
      bottom: '146px',
    },
    {
      text: '잎사귀에 왜 구멍이 나지..?',
      fontSize: '10px',
      fontWeight: 'bold',
      left: '540px',
      bottom: '150px',
    },
    {
      text: '왜 자꾸 시들지..?',
      fontSize: '84px',
      fontWeight: 'bold',
      left: '700px',
      bottom: '110px',
    },
    {
      text: '이 식물 이름이 뭘까?',
      fontSize: '28px',
      fontWeight: 500,
      right: '210px',
      bottom: '100px',
    },
    {
      text: '잎사귀가 왜 노랗게 변했지..?',
      fontSize: '14px',
      fontWeight: 600,
      right: '160px',
      bottom: '160px',
    },
    {
      text: '나처럼 식물을 좋아하는 사람 어디 없나?',
      fontSize: '18px',
      fontWeight: 500,
      left: '10px',
      bottom: '90px',
    },
    {
      text: '향기가 나면 좋겠는데!',
      fontSize: '22px',
      fontWeight: 500,
      left: '380px',
      bottom: '80px',
    },
    {
      text: '친구에게 식물 선물 하나 하고 싶은데..',
      fontSize: '26px',
      fontWeight: 500,
      right: '860px',
      bottom: '50px',
    },
    {
      text: '내 방에는 어떤 식물이 어울릴까?',
      fontSize: '50px',
      fontWeight: 'bold',
      right: '60px',
      bottom: '20px',
    },
    {
      text: '물은 얼마나 자주 줘야하지?',
      fontSize: '34px',
      fontWeight: 'bold',
      left: '60px',
      bottom: '30px',
    },
  ]

  return (
    <Marquee
      gradient={true}
      speed={100}
      pauseOnHover={true}
      style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        boxSizing: 'content-box',
        height: '270px',
        position: 'relative',
      }}
    >
      {texts.map((item, index) => (
        <StyledSpan
          key={index}
          fontSize={item.fontSize}
          fontWeight={item.fontWeight}
          left={item.left}
          right={item.right}
          top={item.top}
          bottom={item.bottom}
        >
          {item.text}
        </StyledSpan>
      ))}
    </Marquee>
  )
}

const StyledSpan = styled.span<{
  fontSize: string
  fontWeight: string | number
  left?: string
  right?: string
  top?: string
  bottom?: string
}>`
  position: absolute;
  color: rgba(40, 40, 40, 1);
  transition: all 0.3s ease;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.top && `top: ${props.top};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
`
