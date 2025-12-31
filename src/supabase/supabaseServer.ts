import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  'https://gkumxciovhhhvaswvhkq.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdW14Y2lvdmhoaHZhc3d2aGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjcwNTQsImV4cCI6MjA3MjAwMzA1NH0.v--FXoMJKE3LWiu4IHwvZOPNgYh3HNm2TIrWXpzBr3M'

/**
 * Server Actions / Route Handlers 용 Supabase 클라이언트.
 * - 쿠키를 "쓰기"까지 지원해서 로그인/로그아웃 시 세션 쿠키가 정상 반영됩니다.
 */
export async function createSupabaseServerActionClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })
}

/**
 * Server Components 용 Supabase 클라이언트.
 * - Server Component에서는 쿠키 "쓰기"가 불가하므로 setAll은 no-op입니다.
 * - 토큰 갱신은 middleware에서 수행되는 전제를 둡니다.
 */
export async function createSupabaseServerComponentClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {
        // no-op (Server Components에서는 cookies().set 불가)
      },
    },
  })
}


