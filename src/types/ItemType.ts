export type BadgeType = 'hot' | 'fast'

export interface ItemType {
  badge: BadgeType[]
  category: string
  classification: string
  color: string | null
  deliveryperiod: number
  discount: number
  id: number
  imgurl: string
  origin: string
  originalprice: number
  size: string
  title: string
}

export interface FetchItemsResponse {
  items: ItemType[]
  nextCursor: number | null
}


