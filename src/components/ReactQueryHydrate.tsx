'use client'

import type { ReactNode } from 'react'
import type { DehydratedState } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'

export function ReactQueryHydrate({
  state,
  children,
}: {
  state: DehydratedState
  children: ReactNode
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>
}


