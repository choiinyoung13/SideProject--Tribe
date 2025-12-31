import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { IoMdHeart } from 'react-icons/io'
import { motion } from 'framer-motion'
import { PostType } from '@/types/PostType'
import { formatDateToYYYY_MM_DD } from '@/lib/utils/formatDateToYYYYMMDD'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type PurchaseHistory = {
  id: number
  price: number
  title: string
  img_url: string
  amount: number
  created_at: string
}

interface CardProps {
  post?: PostType
  purchase?: PurchaseHistory
}

export const Card = ({ post, purchase }: CardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const router = useRouter()

  // 게시물 페이지로 이동
  const handleCardClick = () => {
    if (post) {
      router.push(`/community/post/${post.id}`)
    }
  }

  if (purchase) {
    return (
      <div
        className="w-[calc(25%_-_15px)] h-1/2 bg-[#f8f9fa] p-[15px] border border-[#e0e0e0] rounded-[6px] text-left text-[#333] box-border cursor-pointer [&_h3]:m-0 [&_h3]:text-[0.95rem] [&_h3]:font-[600] [&_h3]:text-[rgba(50,50,50,1)] [&_p]:m-[11px_0] [&_p]:text-[0.8rem] [&_p]:whitespace-nowrap [&_p]:overflow-hidden [&_p]:text-ellipsis max-[1024px]:w-[calc(33.33%_-_15px)] max-[768px]:w-[calc(50.65%_-_15px)] max-[600px]:w-[calc(50.85%_-_15px)]"
        onClick={() => {
          router.push(`/product/${purchase.id}`)
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full pt-[100%] relative mb-[10px]">
            <img
              className="absolute top-0 left-0 w-full h-full rounded-[6px] object-cover"
              src={purchase.img_url}
              alt={purchase.title}
              onLoad={() => {
                setIsImageLoaded(true)
              }}
            />
          </div>
          <div className="flex flex-col">
            <h3>{purchase.title}</h3>
            <div className="w-full flex flex-col text-[0.8rem] text-[#888] gap-[12px] mt-[14px] max-[768px]:text-[0.75rem] max-[600px]:text-[0.7rem]">
              <div className="flex items-center justify-between [&>span:first-of-type]:w-[60px] [&>span:last-of-type]:whitespace-nowrap [&>span:last-of-type]:overflow-hidden [&>span:last-of-type]:text-ellipsis">
                <span>수량</span>
                <span>{purchase.amount}</span>
              </div>
              <div className="flex items-center justify-between [&>span:first-of-type]:w-[60px] [&>span:last-of-type]:whitespace-nowrap [&>span:last-of-type]:overflow-hidden [&>span:last-of-type]:text-ellipsis">
                <span>구매일</span>
                <span>{formatDateToYYYY_MM_DD(purchase.created_at)}</span>
              </div>
              <div className="flex items-center justify-between [&>span:first-of-type]:w-[60px] [&>span:last-of-type]:whitespace-nowrap [&>span:last-of-type]:overflow-hidden [&>span:last-of-type]:text-ellipsis">
                <span>사용금액</span>
                <span>{purchase.price.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (post) {
    return (
      <div
        className="w-[calc(25%_-_15px)] h-1/2 bg-[#f8f9fa] p-[15px] border border-[#e0e0e0] rounded-[6px] text-left text-[#333] box-border cursor-pointer [&_h3]:m-0 [&_h3]:text-[0.95rem] [&_h3]:font-[600] [&_h3]:text-[rgba(50,50,50,1)] [&_p]:m-[11px_0] [&_p]:text-[0.8rem] [&_p]:whitespace-nowrap [&_p]:overflow-hidden [&_p]:text-ellipsis max-[1024px]:w-[calc(33.33%_-_15px)] max-[768px]:w-[calc(50.65%_-_15px)] max-[600px]:w-[calc(50.85%_-_15px)]"
        onClick={handleCardClick}
      >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full pt-[100%] relative mb-[10px]">
              <img
                className="absolute top-0 left-0 w-full h-full rounded-[6px] object-cover"
                src={post.img_urls[0]}
                alt={post.title}
                onLoad={() => {
                  setIsImageLoaded(true)
                }}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="whitespace-nowrap overflow-hidden text-ellipsis max-[768px]:text-[0.9rem] max-[600px]:text-[0.8rem]">
                <span className="font-[400] text-[0.95rem] text-[rgba(100,100,100,1)] mr-[4px]">
                  [{post.category}]
                </span>
                {post.title}
              </h3>
              <p>{post.content}</p>
              <div className="w-full flex justify-end text-[0.8rem] text-[#888] [&_span]:block [&_span]:mt-[5px] max-[768px]:text-[0.75rem] max-[600px]:text-[0.7rem]">
                <div className="flex items-center mr-[10px] [&_svg]:text-[rgb(253,70,108)] [&_svg]:text-[0.9rem] [&_svg]:mt-[5px] [&_svg]:mr-[3px]">
                  <IoMdHeart />
                  <span>{!post.liked ? 0 : post.liked.length}개</span>
                </div>
                <div className="flex items-center [&_svg]:text-[rgb(30,30,30)] [&_svg]:text-[0.9rem] [&_svg]:mt-[5px] [&_svg]:mr-[3px]">
                  <IoChatbubbleEllipsesOutline />
                  <span>{!post.comments ? 0 : post.comments.length}개</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
    )
  }

  return null
}
