import { atom } from 'recoil'

export const filterState = atom({
  key: 'filterState',
  default: {
    fast: null,
    hot: null,
    size: null,
    price: null,
    color: null,
  },
})
