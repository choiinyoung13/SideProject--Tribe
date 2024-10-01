export interface CartItemType {
  title: string
  imgUrl: string
  originalPrice: number
  discount: number
  checked: boolean
  receivingDate: number
  itemId: number
  quantity: number
  deliveryPeriod: number
}

export interface CartItemTypeWithUserId extends CartItemType {
  userId: string
}
