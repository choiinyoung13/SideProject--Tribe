import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import styled from 'styled-components'

type ButtonProps = {
  children: string
  hover: boolean
  btnType?: 'link'
  colorType: 'white' | 'black'
}

export default function Button({
  children,
  hover,
  btnType,
  colorType,
}: ButtonProps) {
  return (
    <Btn hover={hover} colorType={colorType}>
      {children}
      {btnType === 'link' && (
        <RightIcon>
          <MdOutlineKeyboardArrowRight />
        </RightIcon>
      )}
    </Btn>
  )
}

interface ButtonPropsType {
  hover: boolean
  colorType: string
}

const Btn = styled.button<ButtonPropsType>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: ${props =>
    props.colorType === 'white'
      ? 'rgba(255,255,255,1)'
      : 'rgba(20, 20, 20, 1)'};
  color: ${props =>
    props.colorType === 'white'
      ? 'rgba(20, 20, 20, 1)'
      : 'rgba(255,255,255,1)'};
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid
    ${props =>
      props.colorType === 'white' ? 'rgba(150, 150, 150, 0.5)' : 'none'};

  &:hover {
    background-color: ${props =>
      props.hover === true ? 'rgba(40,40,40,1)' : ''};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 414px) {
    width: 120px;
    font-size: 0.6rem;
    padding: 6px 10px;
  }
`

const RightIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 10px;
  }

  @media (max-width: 414px) {
    margin-left: 0px;
    font-size: 14px;
  }
`
