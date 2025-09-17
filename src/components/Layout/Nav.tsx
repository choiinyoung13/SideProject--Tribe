import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import tribe_logo from '../../assets/images/logo/logo-tribe.png'
import usewindowWidth from '../../hooks/useWindowWidth'
import { useMenuToggle } from '../../hooks/useMenuToggle'
import { LAYOUT_CONSTANTS } from '../../constants/layoutConstants'
import { NavProps, PageName } from '../../types/NavTypes'
import AppInstallBanner from './NavComponents/AppInstallBanner'
import NavLinks from './NavComponents/NavLinks'
import DesktopMenu from './NavComponents/DesktopMenu'
import MobileMenu from './NavComponents/MobileMenu'

export default function Nav() {
  const location = useLocation()
  const windowwidth = usewindowWidth()
  const pantname = location.pathname.slice(1) as PageName
  const { menuOpen, toggleMenu } = useMenuToggle()

  return (
    <>
      <AppInstallBanner windowwidth={windowwidth} menuOpen={menuOpen} />
      <NavCon pantname={pantname} windowwidth={windowwidth} menuopen={menuOpen}>
        <NavLeft>
          <Logo>
            <img src={tribe_logo} alt="tribe logo" />
          </Logo>
          <NavLinks menuOpen={menuOpen} />
        </NavLeft>

        <DesktopMenu />

        <HamburgerMenu onClick={() => toggleMenu(!menuOpen)}>
          {menuOpen ? <IoMdClose /> : <FaBars />}
        </HamburgerMenu>

        <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </NavCon>
    </>
  )
}

const NavLeft = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${LAYOUT_CONSTANTS.BREAKPOINTS.MOBILE}px) {
    align-items: start;
  }

  @media (max-width: ${LAYOUT_CONSTANTS.BREAKPOINTS.DESKTOP}px) {
    // 1000px 이하에서 로고는 계속 표시
    display: flex;
  }
`

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  z-index: 9999;

  @media (max-width: ${LAYOUT_CONSTANTS.BREAKPOINTS.DESKTOP}px) {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
  }
`

const NavCon = styled.nav<NavProps>`
  position: absolute;
  top: 0px;
  z-index: 102;
  width: 100%;
  height: 100px;
  padding: 15px 60px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => getBackgroundColor(props.pantname as PageName)};

  @media (max-width: 1024px) {
    height: 90px;
    padding: 40px 60px;
  }

  @media (max-width: 768px) {
    height: 74px;
    padding: 0px 34px;
  }

  @media (max-width: ${LAYOUT_CONSTANTS.BREAKPOINTS.MOBILE}px) {
    top: ${props => (props.menuopen ? '10px' : '52px')};
    padding: 0px 26px 0px 26px;
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
  }

  @media (max-width: ${LAYOUT_CONSTANTS.BREAKPOINTS.DESKTOP}px) {
    // 1000px 이하에서는 로고와 햄버거만 보이도록 설정
    justify-content: space-between;

    ${NavLeft}, ${HamburgerMenu} {
      display: flex;
    }
  }
`

const Logo = styled.div`
  width: 15px;
  height: 15px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`

// 헬퍼 함수
const getBackgroundColor = (pantname: PageName): string => {
  const transparentPages: PageName[] = [
    'login',
    'join',
    'about',
    'community-feature',
    '',
  ]
  return transparentPages.includes(pantname)
    ? 'rgba(0,0,0,0)'
    : 'rgba(255,255,255,1)'
}
