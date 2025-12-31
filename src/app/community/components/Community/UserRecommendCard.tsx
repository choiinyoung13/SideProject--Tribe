import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { IoMdHeart } from 'react-icons/io'
import { useState } from 'react'
import { PostType } from '@/types/PostType'
import { useRouter } from 'next/navigation'

interface UserRecommendCardProps {
  post?: PostType
}

export const UserRecommendCard = ({ post }: UserRecommendCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const router = useRouter()

  // 카드 클릭 시 게시물 상세 페이지로 이동
  const handleCardClick = () => {
    if (post) {
      router.push(`/community/post/${post.id}`)
    }
  }

  if (post) {
    return (
      <div
          className="relative w-[calc((100%_-_28px)_/_3)] bg-[#f8f9fa] border border-[#e0e0e0] rounded-[6px] text-left text-[#333] box-border cursor-pointer max-[600px]:w-[calc((100%_-_14px)_/_2)]"
          onClick={handleCardClick}
        >
          <div style={{ opacity: isImageLoaded ? 1 : 0 }}>
            <div className="w-full pt-[100%] relative mb-[10px]">
              <img
                className="absolute top-0 left-0 w-full h-full rounded-[6px] object-cover"
                src={post.img_urls[0]}
                alt={post.title}
                loading="lazy"
                onLoad={() => {
                  setIsImageLoaded(true)
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <h3 className="m-0 text-[0.85rem] font-[600] text-[rgba(50,50,50,1)] whitespace-nowrap overflow-hidden text-ellipsis max-[600px]:text-[0.7rem]">
                <span className="font-[400] text-[0.8rem] text-[rgba(100,100,100,1)] mr-[4px] max-[768px]:text-[0.75rem] max-[600px]:text-[0.7rem] max-[375px]:text-[0.65rem]">
                  [{post.category}]
                </span>
                {post.title}
              </h3>
              <p className="m-[11px_0] text-[0.8rem] whitespace-nowrap overflow-hidden text-ellipsis max-[600px]:text-[0.65rem]">
                {post.content}
              </p>
              <div className="w-full flex justify-end text-[0.8rem] text-[#888] [&_span]:block [&_span]:mt-[5px] max-[768px]:text-[0.75rem] max-[600px]:text-[0.7rem] max-[375px]:text-[0.65rem]">
                <div className="flex items-center mr-[10px] [&_svg]:text-[rgb(253,70,108)] [&_svg]:text-[0.9rem] [&_svg]:mt-[5px] [&_svg]:mr-[3px] max-[768px]:[&_svg]:text-[0.8rem] max-[600px]:[&_svg]:text-[0.75rem] max-[375px]:[&_svg]:text-[0.7rem]">
                  <IoMdHeart />
                  <span>{!post.liked ? 0 : post.liked.length}개</span>
                </div>
                <div className="flex items-center [&_svg]:text-[rgb(30,30,30)] [&_svg]:text-[0.9rem] [&_svg]:mt-[5px] [&_svg]:mr-[3px] max-[768px]:[&_svg]:text-[0.8rem] max-[600px]:[&_svg]:text-[0.75rem] max-[375px]:[&_svg]:text-[0.7rem]">
                  <IoChatbubbleEllipsesOutline />
                  <span>{!post.comments ? 0 : post.comments.length}개</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  return null
}

