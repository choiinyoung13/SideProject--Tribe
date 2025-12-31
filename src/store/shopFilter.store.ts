import { create } from 'zustand'

export type FastOption = '빠른배송' | null
export type HotOption = '인기상품' | null
export type LikeOption = '찜한상품' | null
export type SizeOption =
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'X-Large'
  | '2X-Large'
  | null
export type PriceOption = '5만원 이하' | '5만원~10만원' | '10만원 이상' | null
export type ColorOption =
  | '빨강 계열'
  | '보라 계열'
  | '흰색 계열'
  | '노랑 계열'
  | '블랙 계열'
  | '초록 계열'
  | '파랑 계열'
  | '파스텔 계열'
  | '빈티지 계열'
  | '혼합 컬러'
  | null

export type ShopFilterState = {
  fast: FastOption
  hot: HotOption
  like: LikeOption
  size: SizeOption
  price: PriceOption
  color: ColorOption
}

type ShopFilterActions = {
  setFilter: (partial: Partial<ShopFilterState>) => void
  replaceFilter: (next: ShopFilterState) => void
  reset: () => void
}

const initialFilterState: ShopFilterState = {
  fast: null,
  hot: null,
  like: null,
  size: null,
  price: null,
  color: null,
}

export const useShopFilterStore = create<ShopFilterState & ShopFilterActions>()(
  set => ({
    ...initialFilterState,
    setFilter: partial => set(state => ({ ...state, ...partial })),
    replaceFilter: next => set(() => ({ ...next })),
    reset: () => set(() => ({ ...initialFilterState })),
  })
)
