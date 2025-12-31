'use client'

import { useNavigate } from '@/shared/routing/navigation'
import type { CommunityCategory } from '../lib/api'
import Link from 'next/link'

type Props = {
  tab: string | undefined
  categories: CommunityCategory[]
  isLoading: boolean
  loadingFallback: React.ReactNode
}

export function CategoryNav({
  tab,
  categories,
  isLoading,
  loadingFallback,
}: Props) {
  const navigate = useNavigate()

  return (
    <>
      {/* desktop */}
      <div className="sticky top-0 w-[200px] h-full p-[30px] bg-white border-r border-[#e1e1e1] hidden min-[768px]:block">
        {isLoading
          ? loadingFallback
          : categories.map(cat => (
              <Link
                key={cat.id}
                href={
                  cat.title === '전체'
                    ? '/community'
                    : `/community?tab=${cat.id}`
                }
              >
                <div
                  className={`my-[30px] text-[1rem] cursor-pointer hover:text-[rgba(60,60,60,1)] hover:font-bold ${
                    Number(tab) === cat.id
                      ? 'text-[rgba(60,60,60,1)] font-bold'
                      : 'text-[rgba(130,130,130,1)] font-normal'
                  }`}
                >
                  {cat.title}({cat.count})
                </div>
              </Link>
            ))}
      </div>

      {/* mobile */}
      <div className="relative w-full pt-[20px] px-[20px] pb-0 bg-[#f4f4f4] after:content-[''] after:absolute after:top-[58%] after:right-[34px] after:translate-y-[-50%] after:rotate-[-45deg] after:w-[7px] after:h-[7px] after:border-b-[2.5px] after:border-l-[2.5px] after:border-[rgba(40,40,40,1)] after:pointer-events-none max-[600px]:pt-[30px] max-[600px]:px-[20px] max-[600px]:pb-0 max-[600px]:after:top-[64%] max-[600px]:after:right-[36px] block min-[768px]:hidden">
        {isLoading ? (
          loadingFallback
        ) : (
          <select
            className="w-full bg-white border-0 rounded-[5px] p-[10px_20px_10px_10px] appearance-none focus:outline-none"
            onChange={e => {
              if (e.target.value === '0') {
                navigate('/community')
                return
              }
              navigate(`/community?tab=${e.target.value}`)
            }}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
                {`(${category.count})`}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  )
}
