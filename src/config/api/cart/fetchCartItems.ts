import { supabase } from '../../../supabase/supabaseClient'

interface CartItem {
  itemId: number
  quantity: number
  receivingDate: number
  checked: boolean
  option: string
}

interface CartData {
  items: CartItem[]
}

export const fetchCartItems = async (userId: string): Promise<CartData> => {
  const { data, error } = await supabase
    .from('carts')
    .select('items')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching cart items:', error)
    return { items: [] } // 오류가 발생한 경우 빈 배열 반환
  }

  return data ? { items: data.items } : { items: [] } // data가 null일 경우 빈 배열 반환
}
