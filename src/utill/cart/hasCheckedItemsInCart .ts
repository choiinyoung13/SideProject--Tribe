import { supabase } from '../../supabase/supabaseClient'

interface Item {
  id: number
  checked: boolean
}

export const hasCheckedItemsInCart = async (
  cartId: string
): Promise<boolean> => {
  const { data: cart, error: fetchError } = await supabase
    .from('carts')
    .select('items')
    .eq('user_id', cartId)
    .single()

  if (fetchError) {
    console.error('Error fetching cart:', fetchError)
    return false
  }

  if (!cart || !cart.items) {
    console.error('Cart not found or items not found in cart')
    return false
  }

  const items = cart.items as Item[]
  return items.some(item => item.checked === false)
}
