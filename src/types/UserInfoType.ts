export type UserInfoType = {
  id: string
  email: string
  avatar_url: string | null
  username: string | null
  admin: boolean
  likes: number[] | null
  nickname: string | null
  status_message: string | null
}
