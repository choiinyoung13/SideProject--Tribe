import { useNavigate } from '@/shared/routing/navigation'
import Swal from 'sweetalert2'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

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
    <li className="mr-[50px] last:mr-0">
      <Link
        href={session ? '/cart' : '#'}
        onClick={handleCartClick}
        className="text-[rgba(20,20,20,1)] text-[1rem] font-bold no-underline"
      >
        <span className="relative">
          CART
          {session?.user.id && cartState && (
            <span className="block w-[8px] h-[8px] bg-[rgba(241,28,63,0.877)] absolute right-[-4px] top-[1px] rounded-full" />
          )}
        </span>
      </Link>
    </li>
  )
}
