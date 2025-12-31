import LoginPage from './components/LoginPage'

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {}
  const redirectToRaw = typeof sp.redirectTo === 'string' ? sp.redirectTo : '/'
  const redirectTo = redirectToRaw.startsWith('/') ? redirectToRaw : '/'

  return <LoginPage redirectTo={redirectTo} />
}
