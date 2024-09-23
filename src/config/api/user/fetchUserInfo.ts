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
    .select('email, avatar_url, nickname')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching cart items:', error)
    return
  }
  return data
}
