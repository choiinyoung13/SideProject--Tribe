'use client'

import { Search } from 'lucide-react'

export default function EmptySearchResult({
  message = '검색 결과가 없습니다.',
}: {
  message?: string
}) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
      <div className="inline-flex justify-center items-center w-[72px] h-[72px] bg-gray-50 rounded-full mb-4">
        <Search className="text-gray-300" size={38} />
      </div>
      <p className="text-gray-400 font-semibold text-[1.05rem] leading-snug">
        {message}
      </p>
    </div>
  )
}


