import { create } from 'zustand'

export type CommunitySortValue = '최신순' | '인기순'

type CommunitySortStore = {
  sort: CommunitySortValue
  setSort: (next: CommunitySortValue) => void
  reset: () => void
}

export const useCommunitySortStore = create<CommunitySortStore>(set => ({
  sort: '최신순',
  setSort: next => set({ sort: next }),
  reset: () => set({ sort: '최신순' }),
}))


