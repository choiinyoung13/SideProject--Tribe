import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { fetchTop5Keywords } from '../../config/api/items/saveSearchKeywords'

// 키워드 데이터 타입 정의
interface Keyword {
  keyword: string
  search_count: number
}

interface RealTimeKeywordsProps {
  setInputValue: (value: string) => void
  setSearchKeyword: (value: string) => void
}

export default function RealTimeKeywords({
  setInputValue,
  setSearchKeyword,
}: RealTimeKeywordsProps) {
  const navigate = useNavigate()

  // useQuery를 사용하여 인기 키워드 가져오기
  const { data: keywords, isLoading } = useQuery<Keyword[]>(
    'top5Keywords',
    fetchTop5Keywords,
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
    }
  )

  // 인기 키워드를 클릭하면 검색창에 자동으로 추가 및 페이지 이동
  const handleKeywordClick = async (keyword: string) => {
    await navigate('/community')
    await setInputValue(keyword)
    await setSearchKeyword(keyword)
  }
  const skeletonArray = new Array(5).fill(null)

  if (isLoading) {
    return (
      <KeywordsWrapper>
        {skeletonArray.map((_, i) => {
          return <SkeletonLoading key={i} />
        })}
      </KeywordsWrapper>
    )
  }

  return (
    <KeywordsWrapper>
      {/* 인기 키워드 목록 */}
      {!isLoading && keywords && keywords.length > 0
        ? keywords.map((keyword, index) => (
            <KeywordCard
              key={index}
              onClick={() => handleKeywordClick(keyword.keyword)} // 클릭 시 이벤트 처리
            >
              <KeywordRank>{index + 1}</KeywordRank>
              <KeywordText>
                {keyword.keyword} ({keyword.search_count}회 검색)
              </KeywordText>
            </KeywordCard>
          ))
        : !isLoading && (
            <NoKeywordMessage>인기 검색어가 없습니다.</NoKeywordMessage>
          )}
    </KeywordsWrapper>
  )
}

// 스타일링

const KeywordsWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const KeywordCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(240, 240, 240, 1);
  }
`

const KeywordRank = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #6c757d;
  margin-right: 10px;
`

const KeywordText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

// 로딩 메시지 스타일
const SkeletonLoading = styled.div`
  width: 100%;
  height: 40px;
  background-color: #fff;
`

// 키워드가 없을 때 메시지
const NoKeywordMessage = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #888;
  text-align: center;
  padding: 20px;
`
