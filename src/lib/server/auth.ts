import 'server-only'

import { redirect } from 'next/navigation'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'

export async function getOptionalUser() {
  const supabase = await createSupabaseServerComponentClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ?? null
}

export async function requireUser(redirectTo: string = '/login') {
  const user = await getOptionalUser()
  if (!user) redirect(redirectTo)
  return user
}


