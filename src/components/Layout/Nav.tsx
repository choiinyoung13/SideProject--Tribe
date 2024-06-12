import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import tribe_logo from '../../assets/images/logo_tribe.png'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const pantName = location.pathname.slice(1)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <NavCon pantName={pantName}>
        <NavLeft>
          <Logo>
            <img src={tribe_logo} alt="" />
          </Logo>
          <NavLinks className={menuOpen ? 'open' : ''}>
            <Link to={'/'}>
              <li>HOME</li>
            </Link>
            <Link to={'/shop'}>
              <li>SHOP</li>
            </Link>
            <Link to={'/community'}>
              <li>COMMUNITY</li>
            </Link>
          </NavLinks>
        </NavLeft>
        <NavRight>
          <Link to={'/login'}>
            <li>LOGIN</li>
          </Link>
          <Link to={'/join'}>
            <li>JOIN</li>
          </Link>
        </NavRight>
        <HamburgerMenu onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </HamburgerMenu>
        {menuOpen && (
          <MobileMenu>
            <Link to={'/'} onClick={toggleMenu}>
              <li>HOME</li>
            </Link>
            <Link to={'/shop'} onClick={toggleMenu}>
              <li>SHOP</li>
            </Link>
            <Link to={'/community'} onClick={toggleMenu}>
              <li>COMMUNITY</li>
            </Link>
            <Link to={'/login'} onClick={toggleMenu}>
              <li>LOGIN</li>
            </Link>
            <Link to={'/join'} onClick={toggleMenu}>
              <li>JOIN</li>
            </Link>
          </MobileMenu>
        )}
      </NavCon>
    </>
  )
}

interface NavConType {
  pantName: string
}

const NavCon = styled.nav<NavConType>`
  position: fixed;
  top: 0;
  z-index: 102;
  width: 100%;
  height: 120px;
  padding: 50px 60px;
  display: flex;
  justify-content: space-between;
  background-color: ${props =>
    props.pantName === 'login' ||
    props.pantName === 'join' ||
    props.pantName === ''
      ? 'rgba(0,0,0,0)'
      : 'rgba(255,255,255,1)'};

  @media (max-width: 414px) {
    padding: 30px 30px; 20px 30px;
    height: 90px;
  }
`

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.div`
  width: 22px;
  height: 22px;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    color: rgba(20, 20, 20, 1);
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    margin-left: 50px;

    &:first-of-type {
      margin-left: 150px;
    }
  }

  @media (max-width: 768px) {
    display: none;

    &.open {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: #fff;
      justify-content: center;
      align-items: center;

      a {
        margin: 20px 0;
      }
    }
  }
`

const NavRight = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    color: rgba(20, 20, 20, 1);
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    margin-right: 50px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;

    font-size: 1.5rem;
  }
`

const MobileMenu = styled.ul`
  display: none;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  a {
    color: rgba(20, 20, 20, 1);
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`
