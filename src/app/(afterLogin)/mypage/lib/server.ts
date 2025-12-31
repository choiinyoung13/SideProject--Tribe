import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import type { UserInfoType } from '@/types/UserInfoType'

export async function getUserInfoById(userId: string): Promise<UserInfoType | null> {
  const supabase = await createSupabaseServerComponentClient()
  const { data } = await supabase.from('userinfo').select('*').eq('id', userId).single()
  return (data ?? null) as UserInfoType | null
}


