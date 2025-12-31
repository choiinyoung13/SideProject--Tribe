interface CartItem {
  itemId: number
  quantity: number
  receivingDate: number
  checked: boolean
}

export const countCheckItemAmount = (cartItems: Array<CartItem>) => {
  let count = 0
  cartItems.forEach(item => {
    if (item.checked === true) count++
  })

  return count
}
