import { AiFillThunderbolt } from 'react-icons/ai'
import { FaHotjar } from 'react-icons/fa'
import { IoHeartSharp } from 'react-icons/io5'

interface badgeType {
  badgeType: 'fast' | 'hot' | 'like'
}

export default function Badge({ badgeType }: badgeType) {
  return (
    <div className="flex items-center border border-[rgba(200,200,200,1)] border-solid rounded-[30px] px-[8px] py-[5px] w-[86px] max-[480px]:px-[4px] max-[480px]:py-[2px] max-[480px]:w-[64px]">
      {badgeType === 'fast' && (
        <>
          <span className="text-[0.9rem] text-[rgb(23,241,172)] mr-[4px] max-[480px]:text-[0.8rem]">
            <AiFillThunderbolt />
          </span>
          <p className="text-[0.8rem] font-[400] text-[rgba(90,90,90,1)] max-[480px]:text-[0.6rem]">
            빠른배송
          </p>
        </>
      )}
      {badgeType === 'hot' && (
        <>
          <span className="text-[0.7rem] text-[rgba(250,50,167,0.8)] mr-[5px] max-[480px]:text-[0.6rem]">
            <FaHotjar />
          </span>
          <p className="text-[0.8rem] font-[400] text-[rgba(90,90,90,1)] max-[480px]:text-[0.6rem]">
            인기상품
          </p>
        </>
      )}
      {badgeType === 'like' && (
        <>
          <span className="text-[0.7rem] text-[rgb(231,22,49)] mr-[5px] max-[480px]:text-[0.6rem]">
            <IoHeartSharp />
          </span>
          <p className="text-[0.8rem] font-[400] text-[rgba(90,90,90,1)] max-[480px]:text-[0.6rem]">
            찜한상품
          </p>
        </>
      )}
    </div>
  )
}
