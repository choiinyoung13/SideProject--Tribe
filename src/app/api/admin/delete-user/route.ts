import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getEnv(name: string): string | undefined {
  const v = process.env[name]
  return v && v.length > 0 ? v : undefined
}

export async function POST(req: Request) {
  const supabaseUrl =
    getEnv('SUPABASE_URL') ?? getEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')
  const anonKey = getEnv('SUPABASE_ANON_KEY') ?? getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
    return NextResponse.json(
      { success: false, error: 'Missing Supabase env vars' },
      { status: 500 }
    )
  }

  const authHeader = req.headers.get('authorization')
  const token =
    authHeader && authHeader.toLowerCase().startsWith('bearer ')
      ? authHeader.slice(7)
      : null

  if (!token) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const authSupabase = createClient(supabaseUrl, anonKey)
  const adminSupabase = createClient(supabaseUrl, serviceRoleKey)

  const {
    data: { user },
    error: userError,
  } = await authSupabase.auth.getUser(token)

  if (userError || !user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  // NOTE: 본인 탈퇴만 허용 (토큰에서 user를 얻어 그 user만 삭제)
  const userId = user.id

  // 관련 데이터 정리(서비스 롤로 RLS bypass)
  await adminSupabase.from('carts').delete().eq('user_id', userId)
  await adminSupabase.from('posts').delete().eq('user', userId)
  await adminSupabase.from('userinfo').delete().eq('id', userId)

  const { error: deleteAuthError } = await adminSupabase.auth.admin.deleteUser(userId)

  if (deleteAuthError) {
    return NextResponse.json(
      { success: false, error: deleteAuthError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}


