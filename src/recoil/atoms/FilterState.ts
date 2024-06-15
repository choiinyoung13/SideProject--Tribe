import { atom } from "recoil";

type FastOption = "빠른배송" | null;
type HotOption = "인기상품" | null;
type SizeOption = "Small" | "Medium" | "Large" | "X-Large" | "2X-Large" | null;
type PriceOption = "5만원 이하" | "5만원 ~ 10만원 사이" | "10만원 이상" | null;
type ColorOption =
  | "빨강 계열"
  | "보라 계열"
  | "흰색 계열"
  | "노랑 계열"
  | "블랙 계열"
  | "초록 계열"
  | "파랑 계열"
  | "파스텔 계열"
  | "빈티지 계열"
  | "혼합 컬러"
  | null;

interface FilterState {
  fast: FastOption;
  hot: HotOption;
  size: SizeOption;
  price: PriceOption;
  color: ColorOption;
}

export const filterState = atom<FilterState>({
  key: "filterState",
  default: {
    fast: null,
    hot: null,
    size: null,
    price: null,
    color: null,
  },
});
