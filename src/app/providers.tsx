'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'

const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? dynamic(
        () =>
          import('@tanstack/react-query-devtools').then(
            res => res.ReactQueryDevtools
          ),
        { ssr: false }
      )
    : () => null

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
