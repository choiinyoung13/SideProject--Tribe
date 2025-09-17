import styled from 'styled-components'
import { ImInfo } from 'react-icons/im'
import { LAYOUT_CONSTANTS } from '../../../constants/layoutConstants'

interface AppInstallBannerProps {
  windowwidth: number
  menuOpen: boolean
}

export default function AppInstallBanner({
  windowwidth,
  menuOpen,
}: AppInstallBannerProps) {
  if (windowwidth > LAYOUT_CONSTANTS.BREAKPOINTS.MOBILE || menuOpen) {
    return null
  }

  return (
    <Option>
      <OptionLeft>
        <ImInfo size={17} />
        <span>앱 설치하고 10% 추가 할인받기</span>
      </OptionLeft>
      <OptionRight>
        <OptionButton>앱 설치</OptionButton>
      </OptionRight>
    </Option>
  )
}

const Option = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(40, 40, 40, 1);
  color: #fff;
  padding: 14px 18px 14px 20px;
  font-size: 0.9rem;
`

const OptionLeft = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 12px;
  }
`

const OptionRight = styled.div`
  display: flex;
  align-items: center;
`

const OptionButton = styled.div`
  background-color: #fff;
  color: rgba(20, 20, 20, 1);
  padding: 6px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 14px;
`
