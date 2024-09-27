import { atom } from 'recoil'

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    id: '',
    email: '',
    avatar_url: null as string | null,
    username: '',
    admin: false,
    likes: null,
    nickname: null,
  },
})
