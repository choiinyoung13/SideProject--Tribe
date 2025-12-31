import { create } from 'zustand'

export type ShopSortValue = '추천순' | '낮은가격순' | '높은가격순' | '할인률순'

type ShopSortStore = {
  sort: ShopSortValue
  setSort: (next: ShopSortValue) => void
}

export const useShopSortStore = create<ShopSortStore>(set => ({
  sort: '추천순',
  setSort: next => set({ sort: next }),
}))


