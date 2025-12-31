import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'
import { fetchCartItems } from '@/lib/cart/fetchCartItems'
import CartButton from './CartButton'

export default function DesktopMenu() {
  const { session, signOut } = useAuth()
  const queryClient = useQueryClient()

  const { data: cartData } = useQuery({
    queryKey: QUERY_KEYS.CART_ITEMS,
    queryFn: () => fetchCartItems(session!.user.id),
    enabled: !!session,
  })

  const cartState = !!session && !!(cartData?.items && cartData.items.length > 0)

  const handleLogout = async () => {
    await signOut()
    queryClient.removeQueries({ queryKey: QUERY_KEYS.CART_ITEMS })
  }

  return (
    <ul className="flex list-none m-0 p-0 max-[1000px]:hidden max-[768px]:hidden">
      {session ? (
        <li className="mr-[50px] last:mr-0">
          <Link
            href="/"
            onClick={handleLogout}
            className="text-[rgba(20,20,20,1)] text-[1rem] font-bold no-underline"
          >
            LOGOUT
          </Link>
        </li>
      ) : (
        <li className="mr-[50px] last:mr-0">
          <Link
            href="/login"
            className="text-[rgba(20,20,20,1)] text-[1rem] font-bold no-underline"
          >
            LOGIN
          </Link>
        </li>
      )}

      <CartButton cartState={cartState} />

      {session && (
        <li className="mr-0">
          <Link
            href="/mypage"
            className="text-[rgba(20,20,20,1)] text-[1rem] font-bold no-underline"
          >
            MYPAGE
          </Link>
        </li>
      )}
    </ul>
  )
}
