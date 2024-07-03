import { atom } from 'recoil'

type BadgeType = 'hot' | 'fast'

interface ItemType {
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

export const sortedItemsState = atom<ItemType[]>({
  key: 'sortedItemsState',
  default: [],
})
