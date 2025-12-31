import { createBrowserClient } from "@supabase/ssr";

// Next.js에서는 public 환경변수로 주입됩니다.
// - NEXT_PUBLIC_SUPABASE_URL
// - NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://gkumxciovhhhvaswvhkq.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdW14Y2lvdmhoaHZhc3d2aGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjcwNTQsImV4cCI6MjA3MjAwMzA1NH0.v--FXoMJKE3LWiu4IHwvZOPNgYh3HNm2TIrWXpzBr3M";

/**
 * Browser(Client Components)에서 사용하는 Supabase 클라이언트.
 * - @supabase/ssr의 createBrowserClient를 사용해 쿠키 기반 세션 동기화를 지원합니다.
 * - middleware/Server Components에서 동일 세션을 읽을 수 있게 해줍니다.
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
