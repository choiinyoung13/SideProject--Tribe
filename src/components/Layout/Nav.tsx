import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { ImInfo } from 'react-icons/im'
import tribe_logo from '../../assets/images/logo/logo_tribe.png'
import usewindowWidth from '../../hooks/useWindowWidth'
import { useAuth } from '../../hooks/useAuth'
import { fetchCartItems } from '../../config/api/cart/fetchCartItems'
import { useQuery, useQueryClient } from 'react-query'
import { QUERY_KEYS } from '../../config/constants/queryKeys'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const windowwidth = usewindowWidth()
  const pantname = location.pathname.slice(1)
  const { session, signOut } = useAuth()
  const queryClient = useQueryClient()
  const [cartState, setCartState] = useState(false)

  const { refetch } = useQuery(
    QUERY_KEYS.CART_ITEMS,
    () => fetchCartItems(session!.user.id),
    {
      enabled: !!session,
      onSuccess: data => {
        if (data && data.items.length > 0) {
          setCartState(true)
        } else {
          setCartState(false)
        }
      },
    }
  )

  useEffect(() => {
    if (session) {
      refetch()
    }
  }, [session, refetch])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = async () => {
    await signOut()
    setCartState(false)
    queryClient.invalidateQueries(QUERY_KEYS.CART_ITEMS)
    toggleMenu()
  }

  return (
    <>
      {windowwidth <= 600 && (
        <Option>
          <OptionLeft>
            <ImInfo size={17} />
            <span>앱 설치하고 10% 추가 할인받기</span>
          </OptionLeft>
          <OptionRight>
            <OptionButton>앱 설치</OptionButton>
          </OptionRight>
        </Option>
      )}
      <NavCon pantname={pantname} windowwidth={windowwidth}>
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
          {session ? (
            <Link to={'/'} onClick={handleLogout}>
              <li>LOGOUT</li>
            </Link>
          ) : (
            <Link to={'/login'} onClick={toggleMenu}>
              <li>LOGIN</li>
            </Link>
          )}
          <Link to={session ? '/cart' : '/login'}>
            <PointerWrapper>
              <li>CART</li>
              {session?.user.id && <Pointer cartstate={cartState.toString()} />}
            </PointerWrapper>
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
            {session ? (
              <Link
                to={'/'}
                onClick={() => {
                  toggleMenu()
                  signOut()
                  queryClient.invalidateQueries('@cartData')
                }}
              >
                <li>LOGOUT</li>
              </Link>
            ) : (
              <Link to={'/login'} onClick={toggleMenu}>
                <li>LOGIN</li>
              </Link>
            )}

            <Link to={session ? '/cart' : '/login'} onClick={toggleMenu}>
              <li>CART</li>
            </Link>
          </MobileMenu>
        )}
      </NavCon>
    </>
  )
}

interface NavProps {
  pantname: string
  windowwidth: number
}

const NavCon = styled.nav<NavProps>`
  position: absolute;
  top: 0px;
  z-index: 102;
  width: 100%;
  height: 120px;
  padding: 15px 60px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.pantname === 'login' ||
    props.pantname === 'join' ||
    props.pantname === 'about' ||
    props.pantname === 'community-feature' ||
    props.pantname === ''
      ? 'rgba(0,0,0,0)'
      : 'rgba(255,255,255,1)'};

  @media (max-width: 1024px) {
    height: 90px;
    padding: 40px 60px;
  }

  @media (max-width: 768px) {
    height: 74px;
    padding: 0px 34px;
  }

  @media (max-width: 600px) {
    top: 52px;
    padding: 0px 26px 0px 26px;
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
  }
`

const NavLeft = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    align-items: start;
  }
`

const Logo = styled.div`
  width: 22px;
  height: 22px;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin-right: 0px;
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
    display: flex;
    align-items: center;
    font-size: 1.4rem;
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
  bottom: 0;
  right: 0;
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

  @media (max-width: 600px) {
    min-width: 375px;
  }
`

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

const PointerWrapper = styled.div`
  position: relative;
`

const Pointer = styled.span<{ cartstate: string }>`
  display: ${props => (props.cartstate === 'true' ? 'block' : 'none')};
  width: 9px;
  height: 9px;
  background-color: rgba(241, 28, 63, 0.877);
  position: absolute;
  right: -4px;
  top: -4px;
  border-radius: 50%;
`
