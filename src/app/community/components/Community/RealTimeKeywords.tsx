import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@/shared/routing/navigation'
import {
  fetchTop5Keywords,
  type Keyword,
} from '@/app/community/lib/searchKeywords/fetchTop5Keywords'

interface RealTimeKeywordsProps {
  setInputValue: (value: string) => void
  setSearchKeyword: (value: string) => void
}

export default function RealTimeKeywords({
  setInputValue,
  setSearchKeyword,
}: RealTimeKeywordsProps) {
  const navigate = useNavigate()

  const { data: keywords, isLoading, error } = useQuery<Keyword[]>({
    queryKey: ['top5Keywords'],
    queryFn: fetchTop5Keywords,
    staleTime: 1000 * 30, // 30초로 줄여서 더 자주 업데이트
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true, // 창 포커스 시 자동 refetch
  })

  const handleKeywordClick = async (keyword: string) => {
    navigate('/community')
    setInputValue(keyword)
    setSearchKeyword(keyword)
  }

  const skeletonArray = new Array(5).fill(null)

  if (isLoading) {
    return (
      <div className="w-full max-w-[400px] rounded-[8px] flex flex-col gap-[18px]">
        {skeletonArray.map((_, i) => {
          return <div key={i} className="w-full h-[40px] bg-white" />
        })}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-[1rem] font-[500] text-[#888] text-center p-[20px]">
        키워드를 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

  return (
    <div className="w-full max-w-[400px] rounded-[8px] flex flex-col gap-[18px]">
      {!isLoading && keywords && keywords.length > 0
        ? keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex justify-start items-center p-[12px_16px] bg-white rounded-[8px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-colors duration-300 cursor-pointer hover:bg-[rgba(240,240,240,1)]"
              onClick={() => handleKeywordClick(keyword.keyword)}
            >
              <div className="text-[1rem] font-bold text-[#6c757d] mr-[10px]">
                {index + 1}
              </div>
              <div className="text-[1rem] font-[500] text-[#333] whitespace-nowrap overflow-hidden text-ellipsis">
                {keyword.keyword}
                <span className="text-[0.8rem] text-[rgba(120,120,120,1)] ml-[3px]">
                  ({keyword.search_count}회 검색)
                </span>
              </div>
            </div>
          ))
        : !isLoading && (
            <div className="text-[1rem] font-[500] text-[#888] text-center p-[20px]">
              실시간 검색어가 없습니다.
            </div>
          )}
    </div>
  )
}


