import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { useAuth } from '../../../hooks/useAuth'

interface CartButtonProps {
  cartState: boolean
}

export default function CartButton({ cartState }: CartButtonProps) {
  const { session } = useAuth()
  const navigate = useNavigate()

  const handleCartClick = () => {
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

  return (
    <Link to={session ? '/cart' : '#'} onClick={handleCartClick}>
      <PointerWrapper>
        <li>CART</li>
        {session?.user.id && <Pointer cartstate={cartState.toString()} />}
      </PointerWrapper>
    </Link>
  )
}

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
