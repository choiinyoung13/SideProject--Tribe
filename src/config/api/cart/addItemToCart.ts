import { supabase } from '../../../supabase/supabaseClient'
import { CartItemTypeWithUserId } from '../../../types/CartItemType'

export const addItemToCart = async ({
  userId,
  title,
  imgUrl,
  originalPrice,
  discount,
  checked,
  receivingDate,
  itemId,
  quantity,
  deliveryPeriod,
}: CartItemTypeWithUserId) => {
  const { data: cartData, error: cartError } = await supabase
    .from('carts')
    .select('items')
    .eq('user_id', userId)
    .single()

  if (cartError) {
    console.error(
      '징바구니 데이터를 가져오는중 에러가 발생했습니다:',
      cartError
    )
    return
  }

  const items = cartData.items || []
  const itemIndex = items.findIndex(
    (item: CartItemTypeWithUserId) => item.itemId === itemId
  )

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1)
  } else {
    items.push({
      title,
      imgUrl,
      originalPrice,
      discount,
      checked,
      receivingDate,
      itemId,
      quantity,
      deliveryPeriod,
    })
  }

  const { error: updateError } = await supabase
    .from('carts')
    .update({ items })
    .eq('user_id', userId)

  if (updateError) {
    console.error('장바구니 업데이트 중 에러가 발생했습니다:', updateError)
  }
}
