import { supabase } from '../supabase/supabaseClient'

export const deleteCartItem = async (itemId: number) => {
  const { data, error } = await supabase
    .from('carts')
    .delete()
    .eq('item_id', itemId)

  if (error) {
    console.error('Error deleting item:', error)
  } else {
    console.log('Item deleted:', data)
  }
}
