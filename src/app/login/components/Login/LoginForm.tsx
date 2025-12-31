'use client'

import type { FormHTMLAttributes } from 'react'

interface LoginFormProps {
  action: NonNullable<FormHTMLAttributes<HTMLFormElement>['action']>
  errorMessage?: string
  isLoading?: boolean
  redirectTo?: string
}

/**
 * 로그인 폼 컴포넌트
 * - 제출은 Server Action으로 위임 (useActionState는 상위에서 관리)
 */
export const LoginForm = ({
  action,
  errorMessage,
  isLoading = false,
  redirectTo = '/',
}: LoginFormProps) => {
  return (
    <form className="flex flex-col w-full" action={action}>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <input
        className="p-[10px_12px] text-[1rem] w-full bg-[rgb(245,245,245)] border border-[rgba(220,220,220,1)] rounded-[6px] mb-[8px] disabled:opacity-60 disabled:cursor-not-allowed max-[600px]:w-[85%] max-[600px]:text-[0.8rem] max-[600px]:m-[0_auto_14px]"
        name="email"
        type="text"
        placeholder="가입한 이메일을 입력해주세요. (테스트 id: test1@gmail.com)"
        disabled={isLoading}
        autoComplete="email"
      />
      <input
        className="p-[10px_12px] text-[1rem] w-full bg-[rgb(245,245,245)] border border-[rgba(220,220,220,1)] rounded-[6px] mb-[8px] disabled:opacity-60 disabled:cursor-not-allowed max-[600px]:w-[85%] max-[600px]:text-[0.8rem] max-[600px]:m-[0_auto_14px]"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요. (테스트 pw: 123456)"
        disabled={isLoading}
        autoComplete="current-password"
      />
      {errorMessage && (
        <p className="text-[rgb(243,28,0)] text-[0.9rem] mb-[10px] text-center">
          {errorMessage}
        </p>
      )}
      <button
        className="text-white bg-[rgba(20,20,20,1)] p-[12px_30px] cursor-pointer border-0 rounded-[6px] mb-[10px] hover:bg-[rgba(30,30,30,1)] disabled:opacity-60 disabled:cursor-not-allowed max-[600px]:text-[0.9rem] max-[600px]:w-[85%] max-[600px]:m-[0_auto_14px]"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
