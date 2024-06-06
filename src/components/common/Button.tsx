import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import styled from 'styled-components'

type ButtonProps = {
  children: string
  hover: boolean
  btnType?: 'link' | 'button'
}

export default function Button({ children, hover, btnType }: ButtonProps) {
  return (
    <Btn hover={hover}>
      {children}
      {btnType === 'link' && (
        <RightIcon>
          <MdOutlineKeyboardArrowRight size={22} />
        </RightIcon>
      )}
    </Btn>
  )
}

const Btn = styled.button<{ hover: boolean }>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: rgba(20, 20, 20, 1);
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      props.hover ? 'rgba(30,30,30,1)' : 'rgba(160,160,160,1)'};
  }
`

const RightIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`
