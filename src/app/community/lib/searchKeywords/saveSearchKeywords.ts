import { supabase } from '@/supabase/supabaseClient'

import { cleanSearchQuery, fetchIpAddress, stopWords } from './_shared'

// 키워드를 Supabase에 저장하는 함수
export const saveSearchKeywords = async (searchQuery: string) => {
  const keywords = cleanSearchQuery(searchQuery, stopWords)

  const { data } = await supabase.auth.getUser()
  const user = data?.user

  // 비회원의 경우 IP 주소 가져오기 (실패해도 계속 진행)
  let ipAddress = ''
  if (!user) {
    try {
      ipAddress = (await fetchIpAddress()) ?? ''
      if (!ipAddress) {
        console.warn('IP 주소를 가져오지 못했습니다. IP 없이 키워드를 저장합니다.')
      }
    } catch (error) {
      console.warn('IP 주소 가져오기 실패. IP 없이 키워드를 저장합니다.', error)
      // IP 주소를 가져오지 못해도 키워드 저장은 계속 진행
    }
  }

  if (keywords.length > 0) {
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

    const newKeywords = keywords.filter(
      keyword => !recentKeywords.some(recent => recent.keyword === keyword)
    )

    if (newKeywords.length > 0) {
      const { error } = await supabase.from('search_keywords').insert(
        newKeywords.map(keyword => ({
          keyword,
          user_id: user?.id || null,
          ip_address: user ? null : ipAddress,
        }))
      )

      if (error) {
        console.error('키워드 저장 실패:', error)
      }
    }
  }
}


