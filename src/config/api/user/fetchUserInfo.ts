import { supabase } from '../../../supabase/supabaseClient'

export const fetchUserLikesInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('likes')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching cart items:', error)
    return
  }
  return data
}

// userId로 해당 유저의 email, avatar_url, nickname 정보 받아오기
export const fetchUserInfoByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching cart items:', error)
    return
  }
  return data
}

type PurchaseHistory = {
  id: number
  price: number
  title: string
  img_url: string
  amount: number
  created_at: string
  additional_product: string
}

type FetchPurchaseHistoryResponse = {
  posts: PurchaseHistory[]
  nextCursor: number | null
}

// 유저의 구매 내역 조회
export async function fetchPurchaseHistoryPerPage(
  pageParam: number = 0,
  pageSize: number = 8
): Promise<FetchPurchaseHistoryResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  // 현재 로그인된 유저의 세션 정보를 가져옴
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인된 유저가 없습니다.')
  }

  // Supabase에서 해당 유저의 purchase_history 정보 가져오기
  const { data, error } = await supabase
    .from('userinfo')
    .select('purchase_history')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('데이터 조회 오류:', error.message)
    return { posts: [], nextCursor: null }
  }

  if (!data || !data.purchase_history || data.purchase_history.length === 0) {
    return { posts: [], nextCursor: null }
  }

  // purchase_history 배열을 최근 순으로 정렬 (created_at 기준)
  const sortedPurchaseHistories = data.purchase_history.sort(
    (a: PurchaseHistory, b: PurchaseHistory) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // 페이지네이션에 맞게 잘라내기
  const paginatedPurchaseHistories = sortedPurchaseHistories.slice(
    start,
    end + 1
  )

  const hasMore = paginatedPurchaseHistories.length === pageSize
  const nextCursor = hasMore ? pageParam + 1 : null

  return { posts: paginatedPurchaseHistories, nextCursor }
}
