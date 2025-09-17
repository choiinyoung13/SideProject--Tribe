import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface NavLinksProps {
  menuOpen: boolean
}

export default function NavLinks({ menuOpen }: NavLinksProps) {
  return (
    <NavLinksContainer className={menuOpen ? 'open' : ''}>
      <Link to={'/'}>
        <li>HOME</li>
      </Link>
      <Link to={'/shop'}>
        <li>SHOP</li>
      </Link>
      <Link to={'/community'}>
        <li>COMMUNITY</li>
      </Link>
    </NavLinksContainer>
  )
}

const NavLinksContainer = styled.ul`
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

  @media (max-width: 1024px) {
    a {
      &:first-of-type {
        margin-left: 110px;
      }
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
