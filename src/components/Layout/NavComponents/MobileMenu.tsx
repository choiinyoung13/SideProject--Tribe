import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { useAuth } from '../../../hooks/useAuth'
import { useCartState } from '../../../hooks/useCartState'
import { LAYOUT_CONSTANTS } from '../../../constants/layoutConstants'

interface MobileMenuProps {
  menuOpen: boolean
  toggleMenu: (state: boolean) => void
}

export default function MobileMenu({ menuOpen, toggleMenu }: MobileMenuProps) {
  const { session, signOut } = useAuth()
  const { clearCartState } = useCartState()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    clearCartState()
    toggleMenu(false)
  }

  const handleCartClick = () => {
    toggleMenu(false)
    if (!session) {
      Swal.fire({
        text: '로그인 후 사용 가능한 기능입니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1E1E1E',
        cancelButtonColor: '#1E1E1E',
        confirmButtonText: '로그인',
        cancelButtonText: '닫기',
        scrollbarPadding: false,
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }

  if (!menuOpen) return null

  return (
    <MobileMenuContainer>
      <Link to={'/'} onClick={() => toggleMenu(false)}>
        <li>HOME</li>
      </Link>
      <Link to={'/shop'} onClick={() => toggleMenu(false)}>
        <li>SHOP</li>
      </Link>
      <Link to={'/community'} onClick={() => toggleMenu(false)}>
        <li>COMMUNITY</li>
      </Link>

      {session ? (
        <Link to={'/'} onClick={handleLogout}>
          <li>LOGOUT</li>
        </Link>
      ) : (
        <Link to={'/login'} onClick={() => toggleMenu(false)}>
          <li>LOGIN</li>
        </Link>
      )}

      <Link to={session ? '/cart' : '#'} onClick={handleCartClick}>
        <li>CART</li>
      </Link>

      {session && (
        <Link to={'/mypage'} onClick={() => toggleMenu(false)}>
          <li>MYPAGE</li>
        </Link>
      )}
    </MobileMenuContainer>
  )
}

const MobileMenuContainer = styled.ul`
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
  height: 100%;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  z-index: 9998;

  a {
    color: rgba(20, 20, 20, 1);
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    margin: 20px 0;
  }

  @media (max-width: ${LAYOUT_CONSTANTS.BREAKPOINTS.DESKTOP}px) {
    display: flex;
  }

  @media (max-width: ${LAYOUT_CONSTANTS.BREAKPOINTS.MOBILE}px) {
    width: 100%;
  }
`
