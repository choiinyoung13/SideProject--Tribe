export type UserInfoType = {
  id: string
  email: string
  avatar_url: string
  username: string | null
  admin: boolean | null
  likes: string[] | null
  nickname: string | null
  status_message: string
}
