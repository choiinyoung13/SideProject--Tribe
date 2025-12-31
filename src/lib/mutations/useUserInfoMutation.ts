import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'
import { updateUserLikesInfo } from '@/lib/user/updateUserInfo'

export function useUserInfoMutations() {
  const queryClient = useQueryClient()

  const UsersLikesInfoUpdate = useMutation({
    mutationFn: ({ userId, itemId }: { userId: string; itemId: number }) =>
      updateUserLikesInfo({ userId, itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })
    },
  })

  return { UsersLikesInfoUpdate }
}
