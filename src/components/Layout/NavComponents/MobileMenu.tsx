import { useNavigate } from '@/shared/routing/navigation'
import Swal from 'sweetalert2'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'

interface MobileMenuProps {
  menuOpen: boolean
  toggleMenu: (state: boolean) => void
}

export default function MobileMenu({ menuOpen, toggleMenu }: MobileMenuProps) {
  const { session, signOut } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    queryClient.removeQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
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
    <ul className="hidden flex-col list-none m-0 p-0 fixed inset-0 w-full h-full bg-white justify-center items-center z-[9998] max-[1000px]:flex">
      <li className="my-[20px]">
        <Link
          href="/"
          onClick={() => toggleMenu(false)}
          className="text-[rgba(20,20,20,1)] text-[1.5rem] font-bold no-underline"
        >
          HOME
        </Link>
      </li>
      <li className="my-[20px]">
        <Link
          href="/shop"
          onClick={() => toggleMenu(false)}
          className="text-[rgba(20,20,20,1)] text-[1.5rem] font-bold no-underline"
        >
          SHOP
        </Link>
      </li>
      <li className="my-[20px]">
        <Link
          href="/community"
          onClick={() => toggleMenu(false)}
          className="text-[rgba(20,20,20,1)] text-[1.5rem] font-bold no-underline"
        >
          COMMUNITY
        </Link>
      </li>

      {session ? (
        <li className="my-[20px]">
          <Link
            href="/"
            onClick={handleLogout}
            className="text-[rgba(20,20,20,1)] text-[1.5rem] font-bold no-underline"
          >
            LOGOUT
          </Link>
        </li>
      ) : (
        <li className="my-[20px]">
          <Link
            href="/login"
            onClick={() => toggleMenu(false)}
            className="text-[rgba(20,20,20,1)] text-[1.5rem] font-bold no-underline"
          >
            LOGIN
          </Link>
        </li>
      )}

      <li className="my-[20px]">
        <Link
          href={session ? '/cart' : '#'}
          onClick={handleCartClick}
          className="text-[rgba(20,20,20,1)] text-[1.5rem] font-bold no-underline"
        >
          CART
        </Link>
      </li>

      {session && (
        <li className="my-[20px]">
          <Link
            href="/mypage"
            onClick={() => toggleMenu(false)}
            className="text-[rgba(20,20,20,1)] text-[1.5rem] font-bold no-underline"
          >
            MYPAGE
          </Link>
        </li>
      )}
    </ul>
  )
}
