import type { UserInfoType } from '@/types/UserInfoType'
import { saveSearchKeywords } from '@/app/community/lib/searchKeywords/saveSearchKeywords'
import { fetchPostCategories } from '@/app/community/lib/post/fetchPostCategories'
import { fetchRecommends } from '@/app/community/lib/post/fetchRecommends'

export type CommunityCategory = {
  id: number
  title: string
  count: number
}

export async function fetchCommunityCategories(): Promise<CommunityCategory[]> {
  return await fetchPostCategories()
}

export async function fetchCommunityRecommends(): Promise<UserInfoType[]> {
  return (await fetchRecommends()) as UserInfoType[]
}

export async function saveCommunitySearchKeywords(
  query: string
): Promise<void> {
  await saveSearchKeywords(query)
}
