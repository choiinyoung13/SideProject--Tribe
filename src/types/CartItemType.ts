export interface CartItemType {
  title: string
  imgUrl: string
  originalPrice: number
  discount: number
  option: string
  checked: boolean
  receivingDate: number
  itemId: number
  quantity: number
  deliveryPeriod: number
}

export interface CartItemTypeWithUserId extends CartItemType {
  userId: string
}
