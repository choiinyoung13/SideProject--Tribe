import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../../hooks/useAuth'
import { useCartState } from '../../../hooks/useCartState'
import CartButton from './CartButton'

export default function DesktopMenu() {
  const { session, signOut } = useAuth()
  const { cartState, clearCartState } = useCartState()

  const handleLogout = async () => {
    await signOut()
    clearCartState()
  }

  return (
    <NavRight>
      {session ? (
        <Link to={'/'} onClick={handleLogout}>
          <li>LOGOUT</li>
        </Link>
      ) : (
        <Link to={'/login'}>
          <li>LOGIN</li>
        </Link>
      )}

      <CartButton cartState={cartState} />

      {session && (
        <Link to={'/mypage'}>
          <li>MYPAGE</li>
        </Link>
      )}
    </NavRight>
  )
}

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

  @media (max-width: 1000px) {
    display: none; // 1000px 이하에서 숨김
  }

  @media (max-width: 768px) {
    display: none;
  }
`
