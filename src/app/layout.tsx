import '@/index.css'
import type { ReactNode } from 'react'
import { Providers } from './providers'
import Nav from '@/components/Layout/Nav'
import Footer from '@/components/Layout/Footer'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import { AuthProvider } from '@/providers/AuthProvider'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="ko">
      <body>
        <Providers>
          <AuthProvider initialSession={session}>
            <div className="min-w-full w-full overflow-x-hidden">
              <Nav />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
