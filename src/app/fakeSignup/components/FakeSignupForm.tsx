'use client'

import { useEffect, useActionState } from 'react'

import {
  fakeSignupCreateUserAction,
  type FakeSignupState,
} from '@/app/fakeSignup/actions'

export default function FakeSignupForm() {
  const [state, action, isPending] = useActionState<FakeSignupState, FormData>(
    fakeSignupCreateUserAction,
    { ok: true }
  )

  useEffect(() => {
    if (!state) return
    if (state.ok && state.message) alert(state.message)
    if (!state.ok) alert('회원가입 실패: ' + state.error)
  }, [state])

  return (
    <div className="mt-[150px] ml-[100px] [&_input]:block [&_input]:mb-[10px] [&_input]:p-[8px] [&_input]:w-[260px] [&_button]:p-[10px_20px] [&_button]:bg-[#007bff] [&_button]:text-white [&_button]:border-0 [&_button]:cursor-pointer">
      <form action={action}>
        <input
          name="adminKey"
          type="password"
          placeholder="ADMIN_API_KEY (옵션)"
          disabled={isPending}
          autoComplete="off"
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          disabled={isPending}
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          disabled={isPending}
          autoComplete="new-password"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? '처리중...' : '가입'}
        </button>
      </form>
    </div>
  )
}


