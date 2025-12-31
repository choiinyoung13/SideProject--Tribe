import type { FetchShopItemsResponse } from '@/app/shop/lib/types'
export type { ShopItem } from '@/app/shop/lib/types'

export async function fetchItemsPerPage(
  pageParam: number = 0,
  pageSize: number = 10,
  tab: number = 0,
  q: string = ''
): Promise<FetchShopItemsResponse> {
  const params = new URLSearchParams({
    pageParam: String(pageParam),
    pageSize: String(pageSize),
    tab: String(tab),
  })
  if (q) params.set('q', q)

  const res = await fetch(`/api/shop/items?${params.toString()}`, {
    method: 'GET',
  })

  if (!res.ok) {
    console.error('Error fetching shop items:', await res.text().catch(() => ''))
    return { items: [], nextCursor: null }
  }

  return (await res.json()) as FetchShopItemsResponse
}


