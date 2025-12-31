import type { ItemType } from '@/types/ItemType'

export type ShopItem = ItemType & {
  isInCart: boolean
  isLiked: boolean
}

export type FetchShopItemsResponse = {
  items: ShopItem[]
  nextCursor: number | null
}


