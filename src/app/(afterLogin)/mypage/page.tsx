import MyPage from './components/MyPage'
import { requireUser } from '@/lib/server/auth'
import { getUserInfoById } from './lib/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {}
  const tab = typeof sp.tab === 'string' ? sp.tab : null

  const user = await requireUser('/login')

  // 내 정보 탭에서만 userinfo를 미리 가져옵니다. (Activity 탭은 필요 시 별도 fetch)
  const userInfo = tab === null ? await getUserInfoById(user.id) : null

  return <MyPage userId={user.id} initialUserInfo={userInfo} />
}
