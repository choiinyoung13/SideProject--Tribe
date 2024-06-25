import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "../config/constants/queryKeys";
import { updateUserLikesInfo } from "../config/api/user/updateUserInfo";

export function useUserInfoMutations() {
  const queryClient = useQueryClient();

  const UsersLikesInfoUpdate = useMutation(
    ({ userId, itemId }: { userId: string; itemId: number }) =>
      updateUserLikesInfo({ userId, itemId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.USERS);
      },
    }
  );

  return { UsersLikesInfoUpdate };
}
