'use client'

import { IoSearch } from 'react-icons/io5'

import SortButton from './Community/SortButton'
import PostListCon from './Community/PostListCon'

type Props = {
  tab: string | undefined
  inputValue: string
  setInputValue: (v: string) => void
  searchKeyword: string
  onInputValueSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onOpenModal: () => void
}

export function CommunityMain({
  tab,
  inputValue,
  setInputValue,
  searchKeyword,
  onInputValueSubmit,
  onOpenModal,
}: Props) {
  return (
    <div className="flex-1 p-[20px] bg-[#f4f4f4] w-full h-full max-[768px]:pt-[14px] max-[768px]:px-[20px] max-[768px]:pb-[20px]">
      <div className="flex justify-end items-center mb-[20px] w-full">
        <div className="flex items-center flex-[8] mr-[20px] max-[768px]:mr-[12px]">
          <form className="relative w-full" onSubmit={onInputValueSubmit}>
            <div className="text-[1rem] text-[rgba(150,150,150,1)] absolute top-1/2 left-[13px] translate-y-[-45%]">
              <IoSearch />
            </div>
            <input
              className="w-full bg-white border-0 rounded-[6px] p-[10px_14px_10px_36px] text-[0.9rem] focus:outline-none placeholder:text-[rgba(150,150,150,1)]"
              placeholder="궁금한 키워드 입력"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </form>
        </div>
        <div className="flex items-center justify-end flex-1">
          <SortButton />
          <button
            className="w-[70px] py-[6px] px-[10px] bg-[#141414] text-[0.85rem] text-white border-0 rounded-[4px] cursor-pointer ml-[16px] hover:bg-[#242424] max-[1919px]:ml-[26px] max-[768px]:ml-[12px]"
            onClick={onOpenModal}
          >
            글쓰기
          </button>
        </div>
      </div>
      <div className="mt-[20px] w-full h-full">
        <PostListCon searchKeyword={searchKeyword} tab={tab} />
      </div>
    </div>
  )
}
