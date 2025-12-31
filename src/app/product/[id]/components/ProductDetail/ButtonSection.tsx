import { useNavigate } from '@/shared/routing/navigation'
import { useParams } from '@/shared/routing/params'
import { useCartMutations } from '@/features/cart/mutations/useCartMutations'
import { hasCheckedItemInCartByID } from '@/lib/cart/hasCheckedItemsInCart'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { IoHeartSharp } from 'react-icons/io5'
import { useQuery } from '@tanstack/react-query'
import { fetchUserLikesInfo } from '@/lib/user/fetchUserInfo'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'
import { useUserInfoMutations } from '@/features/user/mutations/useUserInfoMutations'
import { CartItemType } from '@/types/CartItemType'
import Swal from 'sweetalert2'
import { addPurchaseHistory } from '@/lib/cart/addPurchaseHistory'
import { priceCalculation } from '@/lib/utils/priceCalculation'

interface ButtonSectionProps {
  isDateSelected: boolean
  orderInfo: CartItemType
}

const checkIsLikeeItem = (likeDatas: number[], itemId: number): boolean => {
  return likeDatas.some(item => item === itemId)
}

export default function ButtonSection({
  isDateSelected,
  orderInfo,
}: ButtonSectionProps) {
  const { addItemToCartMutation } = useCartMutations()
  const navigate = useNavigate()
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : undefined
  const { session } = useAuth()
  const [isInCart, setIsInCart] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { UsersLikesInfoUpdate } = useUserInfoMutations()

  const { data: userLikeData } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: () => fetchUserLikesInfo(session!.user.id),
    enabled: !!session,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  })

  useEffect(() => {
    const checkItemById = async () => {
      if (session) {
        const res = await hasCheckedItemInCartByID(session.user.id, Number(id))
        setIsInCart(res)
      }
    }
    checkItemById()
  }, [id, session])

  useEffect(() => {
    if (userLikeData) {
      const res = checkIsLikeeItem(userLikeData.likes, Number(id))
      setIsLiked(res)
    }
  }, [id, userLikeData])

  const likeColorClass = isLiked
    ? 'text-[rgb(253,70,108)] hover:text-[rgb(253,0,108)]'
    : 'text-[rgba(210,210,210,1)] hover:text-[rgba(190,190,190,1)]'

  return (
    <div className="mt-[30px] w-full flex items-center gap-2">
      <div className="border border-[rgba(210,210,210,1)] rounded-[4px]">
        <button
          className={`p-[6px] border-0 bg-transparent text-[2.2rem] flex items-center justify-center cursor-pointer ${likeColorClass}`}
          onClick={() => {
            if (session) {
              UsersLikesInfoUpdate.mutate({
                userId: session.user.id,
                itemId: Number(id),
              })
            } else {
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
            }
          }}
        >
          <IoHeartSharp />
        </button>
      </div>
      {isDateSelected ? (
        <div className="flex-grow flex justify-between">
          <button
            className="cursor-pointer w-[49%] border border-[rgba(190,190,190,1)] bg-white text-[rgba(30,30,30,1)] text-[1.1rem] font-[400] py-[12px] rounded-lg max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]"
            type="button"
            onClick={() => {
              Swal.fire({
                text: '구매해주셔서 감사합니다.',
                icon: 'success',
                confirmButtonColor: '#1E1E1E',
                confirmButtonText: '확인',
                scrollbarPadding: false,
              }).then(async result => {
                if (result.isConfirmed) {
                  // 구매 데이터를 생성
                  if (session) {
                    const purchaseDataArray = {
                      id: orderInfo.itemId,
                      img_url: orderInfo.imgUrl,
                      title: orderInfo.title,
                      price:
                        priceCalculation(
                          orderInfo.originalPrice,
                          orderInfo.discount
                        ) * orderInfo.quantity,
                      amount: orderInfo.quantity,
                      created_at: new Date().toISOString(),
                    }

                    // 구매 이력을 Supabase에 저장

                    await addPurchaseHistory(session.user.id, purchaseDataArray)
                  }

                  // 확인 버튼을 누르면 이동할 URL
                  navigate('/shop')
                }
              })
            }}
          >
            바로 구매
          </button>
          {isInCart ? (
            <button
              className="cursor-pointer w-[49%] border-0 bg-[rgba(30,30,30,1)] text-white text-[1.1rem] font-[400] py-[12px] rounded-lg max-[1024px]:text-[0.9rem] max-[600px]:text-[0.8rem]"
              type="button"
              onClick={() => {
                navigate('/cart')
              }}
            >
              장바구니로 이동
            </button>
          ) : (
            <button
              className="cursor-pointer w-[49%] border-0 bg-[rgba(30,30,30,1)] text-white text-[1.1rem] font-[400] py-[12px] rounded-lg max-[1024px]:text-[0.9rem] max-[600px]:text-[0.8rem]"
              type="button"
              onClick={() => {
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
                } else {
                  addItemToCartMutation.mutate({
                    title: orderInfo.title,
                    imgUrl: orderInfo.imgUrl,
                    originalPrice: orderInfo.originalPrice,
                    discount: orderInfo.discount,
                    checked: orderInfo.checked,
                    receivingDate: orderInfo.receivingDate,
                    itemId: orderInfo.itemId,
                    quantity: orderInfo.quantity,
                    userId: session.user.id,
                    deliveryPeriod: orderInfo.deliveryPeriod,
                  })
                }
              }}
            >
              장바구니 담기
            </button>
          )}
        </div>
      ) : (
        <div className="flex-grow">
          <button
            className="cursor-pointer w-full bg-[rgba(30,30,30,1)] border-0 text-white text-[1.1rem] font-[400] py-[12px] rounded-lg max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]"
            type="button"
          >
            날짜를 먼저 선택해주세요.
          </button>
        </div>
      )}
    </div>
  )
}
