import { supabase } from '../../../supabase/supabaseClient'

// 1. 키워드에서 제외시킬 용어 리스트 (필요시 확장 가능)
const stopWords = ['이', '그', '저', '그리고', '또한', '하지만']

// 2. 검색어에서 유효한 키워드만 추출하는 함수
const extractKeywords = (searchQuery: string) => {
  // 검색어를 공백으로 분리하여 배열로 변환
  const words = searchQuery.split(' ')

  // 단어가 2자 이상이고 불용어가 아닌 것만 필터링하여 키워드로 간주
  const filteredWords = words.filter(
    word => word.length >= 2 && !stopWords.includes(word)
  )

  return filteredWords
}

// 3. 키워드를 Supabase에 저장하는 함수
export const saveSearchKeywords = async (searchQuery: string) => {
  // 검색어에서 유효한 키워드를 추출
  const keywords = extractKeywords(searchQuery)

  // 유효한 키워드가 있을 경우에만 Supabase에 저장
  if (keywords.length > 0) {
    const { data, error } = await supabase
      .from('search_keywords')
      .insert(keywords.map(keyword => ({ keyword }))) // 각 키워드를 데이터베이스에 저장

    if (error) {
      console.error('키워드 저장 실패:', error)
    } else {
      console.log('키워드 저장 성공:', data)
    }
  }
}

interface Keyword {
  keyword: string
  search_count: number
}

export const fetchTop5Keywords = async (): Promise<Keyword[]> => {
  // 'get_top_keywords'라는 함수는 미리 Supabase 데이터베이스에 생성된 Stored Procedure로,
  // SQL에서 GROUP BY, COUNT, ORDER BY 등의 집계 연산을 수행하여,
  // 검색 기록에서 가장 많이 검색된 상위 5개의 키워드를 집계해 반환.
  const { data, error } = await supabase.rpc('get_top_keywords', {
    limit_count: 5, // 상위 5개 키워드 요청
  })

  if (error) {
    console.error('인기 키워드 가져오기 실패:', error)
    return []
  }

  return data as Keyword[]
}
