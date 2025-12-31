import 'server-only'

import type { FetchShopItemsResponse } from '@/app/shop/lib/types'
import { fetchShopItemsWithUserMeta } from '@/app/shop/lib/fetchShopItemsWithUserMeta'

export async function fetchItemsPerPageServer(
  pageParam: number = 0,
  pageSize: number = 10,
  tab: number = 0,
  q: string = ''
): Promise<FetchShopItemsResponse> {
  return await fetchShopItemsWithUserMeta(pageParam, pageSize, tab, q)
}


