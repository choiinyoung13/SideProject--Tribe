import { useState, useEffect } from 'react'
import styled from 'styled-components'

// 여러 세트의 Mock 데이터
const mockKeywordSets: string[][] = [
  [
    '몬스테라 키우기',
    '다육이 물주기',
    '식물 병충해 방지',
    '공기정화 식물 추천',
    '하늘타리 관리법',
  ],
  [
    '베고니아 키우기',
    '아레카야자 관리',
    '스킨답서스 물주기',
    '산세베리아 관리',
    '관엽식물 추천',
  ],
  [
    '선인장 물주기',
    '행운목 키우기',
    '파키라 관리법',
    '아이비 키우기',
    '식물 인테리어 추천',
  ],
  [
    '칼라데아 키우기',
    '안스리움 관리',
    '필로덴드론 물주기',
    '페퍼민트 키우기',
    '페페로미아 관리',
  ],
  [
    '마오리 소철 키우기',
    '슈가바인 물주기',
    '로즈마리 키우기',
    '허브식물 관리',
    '다육이 번식법',
  ],
]

// 랜덤으로 키워드 세트를 선택하되, 이전에 보인 세트는 제외하는 함수
const getRandomKeywordSet = (prevKeywords: string[]): string[] => {
  let availableSets = mockKeywordSets.filter(
    set => set.toString() !== prevKeywords.toString()
  )

  // 랜덤으로 선택된 세트를 반환
  const randomIndex = Math.floor(Math.random() * availableSets.length)
  return availableSets[randomIndex]
}

// 컴포넌트
export default function RealTimeKeywords() {
  const [keywords, setKeywords] = useState<string[]>(mockKeywordSets[0]) // 처음에는 첫 번째 세트를 기본으로 보여줌

  useEffect(() => {
    // 페이지가 처음 로드될 때 랜덤으로 키워드를 선택 (이전에 보인 키워드는 제외)
    const newKeywords = getRandomKeywordSet(keywords)
    setKeywords(newKeywords)
  }, [])

  return (
    <KeywordsWrapper>
      {keywords.map((keyword, index) => (
        <KeywordCard key={index}>
          <KeywordRank>{index + 1}</KeywordRank>
          <KeywordText>{keyword}</KeywordText>
        </KeywordCard>
      ))}
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
  gap: 18px; /* 각 키워드 간 간격 */
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

  &:hover {
    background-color: #f0f8ff;
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
