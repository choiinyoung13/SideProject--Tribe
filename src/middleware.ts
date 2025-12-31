import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  'https://gkumxciovhhhvaswvhkq.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdW14Y2lvdmhoaHZhc3d2aGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjcwNTQsImV4cCI6MjA3MjAwMzA1NH0.v--FXoMJKE3LWiu4IHwvZOPNgYh3HNm2TIrWXpzBr3M'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  // 세션이 없으면 보호 라우트에서 로그인으로 이동
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/mypage/:path*', '/cart/:path*'],
}
