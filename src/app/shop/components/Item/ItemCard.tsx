'use client'

import Badge from '@/components/Common/Badge'
import { useNavigate } from '@/shared/routing/navigation'
import { priceCalculation } from '@/lib/utils/priceCalculation'
import formatNumberWithCommas from '@/lib/utils/formatNumberWithCommas'
import { IoMdHeart } from 'react-icons/io'
import { useAuth } from '@/hooks/useAuth'
import { PiShoppingCartFill } from 'react-icons/pi'
import { useCartMutations } from '@/features/cart/mutations/useCartMutations'
import { useEffect, useState } from 'react'
import { useUserInfoMutations } from '@/features/user/mutations/useUserInfoMutations'
import defaultImage from '@/assets/images/shop_item/default-image.png'
import Swal from 'sweetalert2'
import { assetSrc } from '@/shared/lib/asset'

type BadgeType = 'hot' | 'fast'

interface ItemCardPropsType {
  id: number
  title: string
  imgurl: string
  originalprice: number
  badge: BadgeType[]
  discount: number
  isInCart: boolean
  isLiked: boolean
  deliveryPeriod: number
}

export default function ItemCard({
  id,
  title,
  imgurl,
  originalprice,
  badge,
  discount,
  isInCart,
  isLiked: initialIsLiked,
  deliveryPeriod,
}: ItemCardPropsType) {
  const [imgSrc, setImgSrc] = useState(imgurl ? imgurl : assetSrc(defaultImage))
  const navigate = useNavigate()
  const { session } = useAuth()
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const { addItemToCartMutation } = useCartMutations()
  const { UsersLikesInfoUpdate } = useUserInfoMutations()

  useEffect(() => {
    setIsLiked(initialIsLiked)
  }, [initialIsLiked])

  useEffect(() => {
    setImgSrc(imgurl ? imgurl : assetSrc(defaultImage))
  }, [imgurl])

  const likeColorClass = isLiked
    ? 'text-[rgb(253,70,108)] hover:text-[rgb(253,0,108)]'
    : 'text-[rgba(210,210,210,1)] hover:text-[rgba(190,190,190,1)]'

  const cartColorClass = isInCart
    ? 'text-[rgba(50,50,50,1)]'
    : 'text-[rgba(210,210,210,1)] hover:text-[rgba(180,180,180,1)]'

  return (
    <div
      className="relative w-full min-w-0 cursor-pointer"
      onClick={() => {
        navigate(`/product/${id}`)
      }}
    >
      <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-[rgba(230,230,230,1)]">
        <img
          src={imgSrc}
          alt="item image"
          draggable="false"
          loading="lazy"
          onError={() => {
            // fallback으로 교체
            const fallback = assetSrc(defaultImage)
            if (imgSrc !== fallback) setImgSrc(fallback)
          }}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-[10px] p-[8px] max-[600px]:mt-[8px] max-[600px]:p-[8px_8px_8px_2px]">
        <div className="text-[1rem] font-[600] mb-[13px] flex flex-col min-w-[200px] max-[1024px]:min-w-[180px] max-[480px]:text-[0.8rem] max-[480px]:min-w-[150px] max-[440px]:text-[0.7rem] max-[440px]:mb-[10px]">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis pb-[2px]">
            {title}
          </span>
          <div className="mt-[10px] flex [&>div]:mr-[6px] [&>div:last-of-type]:mr-0 max-[440px]:mt-[7px]">
            {badge.map((badgeType: 'hot' | 'fast', i: number) => {
              return <Badge key={i} badgeType={badgeType} />
            })}
          </div>
        </div>
        <div className="line-through decoration-[rgba(120,120,120,1)] text-[0.8rem] text-[rgba(120,120,120,1)] mb-[6px] max-[440px]:text-[0.7rem]">
          {formatNumberWithCommas(originalprice)}원
        </div>
        <div className="flex items-center">
          <div className="text-[0.8rem] text-[rgb(223,33,19)] mr-[8px] pt-[3.5px] max-[440px]:text-[0.7rem] max-[440px]:mr-[6px] max-[440px]:pt-[1.5px]">
            {discount}%
          </div>
          <div className="font-[600] max-[440px]:text-[0.75rem]">
            {formatNumberWithCommas(priceCalculation(originalprice, discount))}
            원
          </div>
        </div>
      </div>

      <div className="absolute right-[10px] bottom-[30px] text-[1.5rem] max-[1900px]:text-[1.4rem] max-[1680px]:text-[1.3rem] max-[1120px]:text-[1.1rem] max-[1024px]:text-[1.4rem] max-[860px]:text-[1.2rem] max-[810px]:text-[0.95rem] max-[768px]:text-[1.4rem] max-[600px]:text-[1.3rem] max-[490px]:right-[8px] max-[490px]:bottom-[30px] max-[490px]:text-[0.95rem] max-[400px]:text-[0.95rem] max-[390px]:right-[8px] max-[390px]:bottom-[32px] max-[390px]:text-[0.8rem] max-[365px]:hidden">
        <span
          className={`mr-[6px] cursor-pointer max-[400px]:mr-[4px] ${likeColorClass}`}
          onClick={e => {
            e.stopPropagation()
            if (!session) {
              Swal.fire({
                text: '로그인 후 사용 가능한 기능입니다.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1E1E1E',
                cancelButtonColor: '#1E1E1E',
                confirmButtonText: '로그인',
                cancelButtonText: '닫기',
                scrollbarPadding: false,
              }).then(result => {
                if (result.isConfirmed) {
                  // 로그인 버튼을 누르면 로그인 페이지로 이동
                  navigate('/login')
                }
              })
              return
            }
            UsersLikesInfoUpdate.mutate({
              userId: session.user.id,
              itemId: id,
            })
            setIsLiked(prev => !prev)
          }}
        >
          <IoMdHeart />
        </span>
        <span
          className={`cursor-pointer ${cartColorClass}`}
          onClick={e => {
            e.stopPropagation()
            if (!session) {
              Swal.fire({
                text: '로그인 후 사용 가능한 기능입니다.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1E1E1E',
                cancelButtonColor: '#1E1E1E',
                confirmButtonText: '로그인',
                cancelButtonText: '닫기',
                scrollbarPadding: false,
              }).then(result => {
                if (result.isConfirmed) {
                  // 로그인 버튼을 누르면 로그인 페이지로 이동
                  navigate('/login')
                }
              })
              return
            }
            addItemToCartMutation.mutate({
              userId: session.user.id,
              title: title,
              imgUrl: imgurl,
              originalPrice: originalprice,
              discount: discount,
              checked: false,
              receivingDate: 0,
              itemId: id,
              quantity: 1,
              deliveryPeriod: deliveryPeriod,
            })
          }}
        >
          <PiShoppingCartFill />
        </span>
      </div>
    </div>
  )
}
