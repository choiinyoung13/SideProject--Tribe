import axios from 'axios'

// 키워드에서 제외시킬 용어 리스트 (필요시 확장 가능)
export const stopWords = [
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

export interface Keyword {
  keyword: string
  search_count: number
}

// 불용어를 제거하고 유효한 키워드를 추출하는 함수
export const cleanSearchQuery = (searchQuery: string, stopWords: string[]) => {
  let cleanedQuery = searchQuery

  stopWords.forEach(stopWord => {
    const regex = new RegExp(stopWord, 'g')
    cleanedQuery = cleanedQuery.replace(regex, ' ')
  })

  return [
    ...new Set(
      cleanedQuery
        .split(' ')
        .map(word => word.trim())
        .filter(word => word.length >= 2)
    ),
  ]
}

// IP 주소를 가져오는 함수
export const fetchIpAddress = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/')
    return response.data.ip as string
  } catch (error) {
    console.error('IP 주소를 가져오는 중 오류 발생:', error)
    return null
  }
}


