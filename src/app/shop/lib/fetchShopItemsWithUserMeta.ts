import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import { tabNumberToCategory } from '@/lib/utils/tabNumberToCategory'
import type { CartItemType } from '@/types/CartItemType'
import type { FetchShopItemsResponse, ShopItem } from './types'

export async function fetchShopItemsWithUserMeta(
  pageParam: number = 0,
  pageSize: number = 10,
  tab: number = 0,
  q: string = ''
): Promise<FetchShopItemsResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  const supabase = await createSupabaseServerComponentClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let query = supabase.from('items').select('*').range(start, end)

  if (q) {
    query = query.ilike('title', `%${q}%`)
  }

  if (tab !== 0) {
    const category = tabNumberToCategory(tab)
    query = query.eq('category', `${category}`)
  }

  query = query.order('id', { ascending: true })

  const [{ data: items, error: itemsError }, cartRes, likesRes] =
    await Promise.all([
      query,
      user
        ? supabase.from('carts').select('items').eq('user_id', user.id).single()
        : Promise.resolve({ data: null, error: null }),
      user
        ? supabase.from('userinfo').select('likes').eq('id', user.id).single()
        : Promise.resolve({ data: null, error: null }),
    ])

  if (itemsError) {
    console.error('Error fetching data:', itemsError)
    return { items: [], nextCursor: null }
  }

  const cartItemIds = new Set<number>(
    ((cartRes as { data: { items: CartItemType[] } | null }).data?.items ?? [])
      .map(i => i.itemId)
      .filter((id): id is number => typeof id === 'number')
  )

  const likedIds = new Set<number>(
    (likesRes as { data: { likes: number[] | null } | null }).data?.likes ?? []
  )

  const enriched: ShopItem[] = (items ?? []).map(item => ({
    ...(item as ShopItem),
    isInCart: user ? cartItemIds.has((item as { id: number }).id) : false,
    isLiked: user ? likedIds.has((item as { id: number }).id) : false,
  }))

  const hasMore = (enriched?.length ?? 0) === pageSize
  const nextCursor = hasMore ? pageParam + 1 : null

  return { items: enriched, nextCursor }
}
