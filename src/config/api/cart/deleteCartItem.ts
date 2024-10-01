import { supabase } from '../../../supabase/supabaseClient'

// 체크된 아이템들을 삭제하는 함수
export const deleteCheckedCartItems = async (cartId: string) => {
  const { data: cart, error: fetchError } = await supabase
    .from('carts')
    .select('items')
    .eq('user_id', cartId)
    .single()

  if (fetchError) {
    console.error(
      '장바구니 데이터를 불러오는 중 에러가 발생했습니다:',
      fetchError
    )
    return
  }

  const items = cart.items
  // 체크된 아이템들을 제외한 나머지 아이템만 필터링
  const filteredItems = items.filter(
    (item: { checked: boolean }) => !item.checked
  )

  const { data, error: deleteError } = await supabase
    .from('carts')
    .update({ items: filteredItems })
    .eq('user_id', cartId)

  if (deleteError) {
    console.error(
      '장바구니 데이터를 업데이트하는 중 에러가 발생했습니다:',
      deleteError
    )
  } else {
    console.log('장바구니에서 삭제된 아이템:', data)
  }
}

// 모든 아이템을 삭제하는 함수
export const deleteAllCartItems = async (cartId: string) => {
  const { data, error } = await supabase
    .from('carts')
    .update({ items: [] })
    .eq('user_id', cartId)

  if (error) {
    console.error('장바구니 데이터를 삭제하는 중 에러가 발생했습니다:', error)
  } else {
    console.log('장바구니에서 삭제된 아이템:', data)
  }
}
