'use server'

import { createClient } from '@supabase/supabase-js'

export type FakeSignupState =
  | { ok: true; message?: string }
  | { ok: false; error: string }

function getEnv(name: string): string | undefined {
  const v = process.env[name]
  return v && v.length > 0 ? v : undefined
}

export async function fakeSignupCreateUserAction(
  _prev: FakeSignupState,
  formData: FormData
): Promise<FakeSignupState> {
  // 기존 API route와 동일한 정책: 운영에서는 기본적으로 막음
  const adminApiKey = getEnv('ADMIN_API_KEY')
  if (process.env.NODE_ENV === 'production' && !adminApiKey) {
    return { ok: false, error: 'Not found' }
  }

  if (adminApiKey) {
    const provided = String(formData.get('adminKey') ?? '')
    if (provided !== adminApiKey) {
      return { ok: false, error: 'Unauthorized' }
    }
  }

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { ok: false, error: 'email/password required' }
  }

  const supabaseUrl =
    getEnv('SUPABASE_URL') ?? getEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    return { ok: false, error: 'Missing Supabase env vars' }
  }

  const adminSupabase = createClient(supabaseUrl, serviceRoleKey)
  const { error } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    return { ok: false, error: error.message }
  }

  return { ok: true, message: '회원가입 성공! 이제 로그인할 수 있습니다.' }
}


