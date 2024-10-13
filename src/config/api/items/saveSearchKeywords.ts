import { supabase } from '../../../supabase/supabaseClient'
import axios from 'axios'

// 키워드에서 제외시킬 용어 리스트 (필요시 확장 가능)
const stopWords = [
  '저',
  '그리고',
  '또한',
  '하지만',
  '에게',
  '있는',
  '있고',
  '과',
  '와',
  '데',
  '의',
]

// 불용어를 제거하고 유효한 키워드를 추출하는 함수
const cleanSearchQuery = (searchQuery: string, stopWords: string[]) => {
  let cleanedQuery = searchQuery

  // 불용어 목록을 순회하면서 검색어에서 불용어를 제거
  stopWords.forEach(stopWord => {
    const regex = new RegExp(stopWord, 'g') // 불용어가 포함된 부분을 찾아 제거
    cleanedQuery = cleanedQuery.replace(regex, ' ') // 불용어 제거 후 공백으로 대체
  })

  // 공백으로 분리하고, 공백을 정리(trim), 2자 이상인 단어만 필터링하여 반환
  return cleanedQuery
    .split(' ')
    .map(word => word.trim())
    .filter(word => word.length >= 2) // 2자 이상인 단어만 반환
}

// IP 주소를 가져오는 함수
const fetchIpAddress = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/')
    console.log('IP 주소:', response.data.ip)
    return response.data.ip
  } catch (error) {
    console.error('IP 주소를 가져오는 중 오류 발생:', error)
    return null
  }
}

// 키워드를 Supabase에 저장하는 함수
export const saveSearchKeywords = async (searchQuery: string) => {
  // 검색어에서 유효한 키워드를 추출
  const keywords = cleanSearchQuery(searchQuery, stopWords)

  // 현재 로그인된 사용자의 정보 가져오기
  const { data } = await supabase.auth.getUser()
  const user = data?.user // user 객체 추출

  // 비회원의 경우 IP 주소 가져오기
  let ipAddress = ''
  if (!user) {
    ipAddress = await fetchIpAddress()
    if (!ipAddress) {
      console.error('IP 주소 가져오기 실패.')
      return
    }
  }

  // 유효한 키워드가 있을 경우에만 Supabase에 저장
  if (keywords.length > 0) {
    // 5분 이내에 동일한 키워드가 저장되었는지 확인
    const { data: recentKeywords, error: fetchError } = await supabase
      .from('search_keywords')
      .select('*')
      .eq(user ? 'user_id' : 'ip_address', user?.id || ipAddress)
      .in('keyword', keywords)
      .gte('created_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())

    if (fetchError) {
      console.error('기존 키워드 확인 중 오류 발생:', fetchError)
      return
    }

    // 이미 5분 내에 저장된 키워드는 제외
    const newKeywords = keywords.filter(
      keyword => !recentKeywords.some(recent => recent.keyword === keyword)
    )

    // 저장할 새로운 키워드가 있는 경우에만 저장
    if (newKeywords.length > 0) {
      const { data, error } = await supabase.from('search_keywords').insert(
        newKeywords.map(keyword => ({
          keyword,
          user_id: user?.id || null,
          ip_address: user ? null : ipAddress,
        }))
      )

      if (error) {
        console.error('키워드 저장 실패:', error)
      } else {
        console.log('키워드 저장 성공:', data)
      }
    } else {
      console.log('5분 내 중복된 키워드가 이미 존재하여 저장되지 않음.')
    }
  }
}

interface Keyword {
  keyword: string
  search_count: number
}

// 인기 키워드를 안정적으로 정렬하여 가져오는 함수
export const fetchTop5Keywords = async (): Promise<Keyword[]> => {
  // Supabase에서 상위 5개의 인기 키워드를 가져오는 Stored Procedure 실행
  const { data, error } = await supabase.rpc('get_top_keywords', {
    limit_count: 5,
  })

  if (error) {
    console.error('인기 키워드 가져오기 실패:', error)
    return []
  }

  // 가져온 데이터를 안정적인 정렬로 보장
  const sortedKeywords = [...data].sort((a, b) => {
    if (b.search_count === a.search_count) {
      // 동일한 검색 횟수일 경우 키워드를 알파벳순으로 정렬하여 안정성 유지
      return a.keyword.localeCompare(b.keyword)
    }
    return b.search_count - a.search_count // 검색 횟수가 다를 경우 내림차순 정렬
  })

  return sortedKeywords as Keyword[]
}
