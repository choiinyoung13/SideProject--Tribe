"use client"

import { PenSquare } from 'lucide-react'
import { useNavigate } from '@/shared/routing/navigation'

type Props = {
  variant?: 'feed' | 'cta'
  className?: string
}

export default function WritePostButton({ variant = 'feed', className }: Props) {
  const navigate = useNavigate()

  const base =
    variant === 'cta'
      ? 'appearance-none border-0 w-full bg-white text-emerald-600 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors shadow-sm'
      : 'flex items-center gap-2 px-6 py-2 bg-[#141414] text-white rounded-2xl hover:bg-[#242424] text-sm font-bold transition-colors whitespace-nowrap'

  return (
    <>
      <button
        type="button"
        onClick={() => navigate('/community/write')}
        className={className ? `${base} ${className}` : base}
      >
        {variant === 'feed' ? (
          <>
            <PenSquare size={16} />
            <span>글쓰기</span>
          </>
        ) : (
          '질문하러 가기'
        )}
      </button>
    </>
  )
}


