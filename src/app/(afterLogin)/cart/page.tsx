import { requireUser } from '@/lib/server/auth'
import CartClient from './components/CartClient'
import { getInitialCartItems } from './lib/server'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const user = await requireUser('/login')
  const initialItems = await getInitialCartItems(user.id)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.CART_ITEMS,
    queryFn: async () => {
      return { items: initialItems }
    }
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <CartClient userId={user.id} initialItems={initialItems} />
    </ReactQueryHydrate>
  )
}
