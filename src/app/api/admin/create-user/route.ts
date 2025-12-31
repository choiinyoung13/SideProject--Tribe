import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getEnv(name: string): string | undefined {
  const v = process.env[name]
  return v && v.length > 0 ? v : undefined
}

type Body = {
  email?: string
  password?: string
}

export async function POST(req: Request) {
  // 개발용/관리자용 엔드포인트: 운영에서는 기본적으로 막습니다.
  const adminApiKey = getEnv('ADMIN_API_KEY')
  if (process.env.NODE_ENV === 'production' && !adminApiKey) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  if (adminApiKey) {
    const provided = req.headers.get('x-admin-key')
    if (provided !== adminApiKey) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabaseUrl =
    getEnv('SUPABASE_URL') ?? getEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { success: false, error: 'Missing Supabase env vars' },
      { status: 500 }
    )
  }

  const body = (await req.json().catch(() => ({}))) as Body
  if (!body.email || !body.password) {
    return NextResponse.json(
      { success: false, error: 'email/password required' },
      { status: 400 }
    )
  }

  const adminSupabase = createClient(supabaseUrl, serviceRoleKey)
  const { data, error } = await adminSupabase.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
  })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}


