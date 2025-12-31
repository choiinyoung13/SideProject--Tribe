"use client"

import type { UserInfoType } from '@/types/UserInfoType'
import FollowRecommends from './FollowRecommends'

type Props = {
  recommends: UserInfoType[]
}

export default function FollowRecommendsClient({ recommends }: Props) {
  return <FollowRecommends isRecommendsLoading={false} recommends={recommends} />
}


