import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import type { CartItemType } from '@/types/CartItemType'

export async function getInitialCartItems(userId: string): Promise<CartItemType[]> {
  const supabase = await createSupabaseServerComponentClient()
  const { data } = await supabase
    .from('carts')
    .select('items')
    .eq('user_id', userId)
    .single()

  return (data?.items ?? []) as CartItemType[]
}


