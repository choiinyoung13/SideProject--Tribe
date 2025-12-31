import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getEnv(name: string): string | undefined {
  const v = process.env[name]
  return v && v.length > 0 ? v : undefined
}

// 사용자 이메일 인증 상태 확인 API
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
    const { email } = body as { email?: string }

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'email is required' },
        { status: 400 }
      )
    }

    // Supabase Auth에서 이메일로 사용자 확인
    // getUserByEmail이 없으므로 listUsers로 필터링
    const { data: usersData, error: getUserError } = await adminSupabase.auth.admin.listUsers()

    if (getUserError) {
      return NextResponse.json({
        success: true,
        exists: false,
        isVerified: false,
      })
    }

    const user = usersData.users.find(u => u.email === email)

    if (!user) {
      return NextResponse.json({
        success: true,
        exists: false,
        isVerified: false,
      })
    }

    return NextResponse.json({
      success: true,
      exists: true,
      isVerified: !!user.email_confirmed_at,
    })
  } catch (error) {
    console.error('Check user verification error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

