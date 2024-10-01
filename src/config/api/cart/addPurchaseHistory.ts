import { supabase } from '../../../supabase/supabaseClient'

type PurchaseDataType = {
  title: string
  img_url: string
  price: number
  amount: number
  created_at: string
}

// 상품 구매 내역을 저장하는 함수
export async function addPurchaseHistory(
  userId: string,
  purchaseData: PurchaseDataType
) {
  // 현재 유저의 purchase_history 정보를 가져옴
  const { data, error } = await supabase
    .from('userinfo')
    .select('purchase_history')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('유저 정보를 가져오는데 실패하였습니다:', error)
    return
  }

  const existingHistory = data?.purchase_history || [] // 기존 구매 내역이 없으면 빈 배열

  // 새로운 구매 내역을 기존 내역에 추가
  const updatedHistory = [...existingHistory, purchaseData]

  // Supabase에 업데이트
  const { error: updateError } = await supabase
    .from('userinfo')
    .update({ purchase_history: updatedHistory })
    .eq('id', userId)

  if (updateError) {
    console.error(
      '유저의 구매내역을 업데이트하는데 실패하였습니다.:',
      updateError
    )
  } else {
    console.log('성공적으로 구매내역을 업데이트하였습니다.')
  }
}
