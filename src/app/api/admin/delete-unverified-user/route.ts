import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getEnv(name: string): string | undefined {
  const v = process.env[name]
  return v && v.length > 0 ? v : undefined
}

// 미인증 계정 삭제 API (OTP 모달 취소 시 호출)
export async function POST(req: Request) {
  const supabaseUrl =
    getEnv('SUPABASE_URL') ?? getEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { success: false, error: 'Missing Supabase env vars' },
      { status: 500 }
    )
  }

  const adminSupabase = createClient(supabaseUrl, serviceRoleKey)

  try {
    const body = await req.json().catch(() => ({}))
    const { userId } = body as { userId?: string }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    // 사용자 정보 확인 (이메일 인증이 안 된 경우만 삭제)
    const { data: userData, error: getUserError } = await adminSupabase.auth.admin.getUserById(
      userId
    )

    if (getUserError || !userData.user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // 이미 이메일 인증이 완료된 경우 삭제하지 않음
    if (userData.user.email_confirmed_at) {
      return NextResponse.json(
        { success: false, error: 'User already verified' },
        { status: 400 }
      )
    }

    // 관련 데이터 정리
    await adminSupabase.from('carts').delete().eq('user_id', userId)
    await adminSupabase.from('posts').delete().eq('user', userId)
    await adminSupabase.from('userinfo').delete().eq('id', userId)

    // Auth 사용자 삭제
    const { error: deleteError } = await adminSupabase.auth.admin.deleteUser(userId)

    if (deleteError) {
      console.error('Error deleting user:', deleteError)
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete unverified user error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

