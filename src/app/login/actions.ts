'use server'

import { redirect } from 'next/navigation'

import { validateLoginForm } from '@/lib/utils/validationHelpers'
import { createSupabaseServerActionClient } from '@/supabase/supabaseServer'

export type LoginActionState =
  | { ok: true }
  | { ok: false; error: string; code?: 'NO_ACCOUNT' | 'EMAIL_NOT_CONFIRMED'; email?: string }

export async function loginWithPasswordAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const redirectToRaw = String(formData.get('redirectTo') ?? '/')
  const redirectTo = redirectToRaw.startsWith('/') ? redirectToRaw : '/'

  const validation = validateLoginForm(email, password)
  if (!validation.isValid) {
    return { ok: false, error: validation.error }
  }

  const supabase = await createSupabaseServerActionClient()

  // 기존 UX 유지: 이메일로 가입 여부를 먼저 확인
  const { data: userExistsData, error: userExistsError } = await supabase
    .from('userinfo')
    .select('email')
    .eq('email', email)
    .single()

  if (userExistsError || !userExistsData) {
    return { ok: false, code: 'NO_ACCOUNT', error: '가입된 계정이 아닙니다.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message === 'Email not confirmed') {
      return {
        ok: false,
        code: 'EMAIL_NOT_CONFIRMED',
        error: '이메일 인증이 완료되지 않은 계정입니다.',
        email,
      }
    }
    return { ok: false, error: '올바른 비밀번호가 아닙니다.' }
  }

  // 성공 시: 쿠키 세션이 setAll로 반영된 뒤 redirect
  redirect(redirectTo || '/')
}


