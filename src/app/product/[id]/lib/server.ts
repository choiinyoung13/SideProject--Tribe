import 'server-only'

import { notFound } from 'next/navigation'
import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import type { ItemType } from '@/types/ItemType'

export async function getProductByIdOrNotFound(id: number): Promise<ItemType> {
  const supabase = await createSupabaseServerComponentClient()
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()
  return data as ItemType
}


