import styled from 'styled-components'
import { IoTriangleSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()
  const path = location.pathname.slice(1)

  return (
    <>
      {path !== 'login' && path !== 'join' ? (
        <NavCon>
          <NavLeft>
            <div>
              <IoTriangleSharp />
            </div>
            <ul>
              <Link to={'/'}>
                <li>HOME</li>
              </Link>
              <Link to={'/shop'}>
                <li>SHOP</li>
              </Link>
              <Link to={'/community'}>
                <li>COMMUNITY</li>
              </Link>
            </ul>
          </NavLeft>
          <NavRight>
            <Link to={'/login'}>
              <li>LOGIN</li>
            </Link>
            <Link to={'/join'}>
              <li>JOIN</li>
            </Link>
          </NavRight>
        </NavCon>
      ) : null}
    </>
  )
}

const NavCon = styled.nav`
  position: fixed;
  z-index: 99;
  width: 100%;
  padding: 50px 60px;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;

    a {
      color: rgba(20, 20, 20, 1);
      font-size: 1rem;
      font-weight: bold;
    }
  }
`
const NavLeft = styled.div`
  display: flex;

  ul {

    a {
      margin-left: 50px;

      &:first-of-type {
        margin-left: 150px;
      }
  }
`
const NavRight = styled.ul`
  display: flex;

  a {
    margin-right: 50px;

    &:last-of-type {
      margin-right: 0px;
    }
  }
`
