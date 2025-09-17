import { MdKeyboardArrowRight } from 'react-icons/md'
import styled from 'styled-components'
import { ToggleSectionProps } from '../../../types/FooterTypes'

export default function ToggleSection({
  title,
  isOpen,
  onToggle,
  children,
}: ToggleSectionProps) {
  return (
    <ToggleSectionContainer>
      <ToggleHeader onClick={onToggle}>
        {title} <MdKeyboardArrowRight />
      </ToggleHeader>
      {isOpen && <ToggleContent>{children}</ToggleContent>}
    </ToggleSectionContainer>
  )
}

const ToggleSectionContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(210, 210, 210, 0.1);

  &:last-of-type {
    border: none;
    padding-bottom: 4px;
  }
`

const ToggleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  background-color: rgba(30, 30, 30, 1);
  color: rgba(210, 210, 210, 1);

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
`

const ToggleContent = styled.div`
  padding: 10px;
  background-color: rgba(30, 30, 30, 1);
  color: rgba(210, 210, 210, 1);
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 28px;
`
