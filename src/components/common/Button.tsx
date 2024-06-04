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
  background-color: #fff;
  border: 1px solid rgba(20, 20, 20, 1);
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.hover ? 'rgba(20,20,20,1)' : '#fff')};
    color: ${props => (props.hover ? '#fff' : 'rgba(20,20,20,1)')};
  }
`

const RightIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`
