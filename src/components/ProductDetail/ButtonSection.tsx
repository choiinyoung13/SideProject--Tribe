import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useCartMutations } from '../../mutations/useCartMutations'
import { hasCheckedItemInCartByID } from '../../config/api/cart/hasCheckedItemsInCart '
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { IoHeartSharp } from 'react-icons/io5'
import { useQuery } from 'react-query'
import { fetchUserLikesInfo } from '../../config/api/user/fetchUserInfo'
import { QUERY_KEYS } from '../../config/constants/queryKeys'
import { useUserInfoMutations } from '../../mutations/useUserInfoMutation'
import { CartItemType } from '../../types/CartItemType'
import Swal from 'sweetalert2'
import { addPurchaseHistory } from '../../config/api/cart/addPurchaseHistory'
import { priceCalculation } from '../../utill/priceCalculation'

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
  const { id } = useParams()
  const { session } = useAuth()
  const [isInCart, setIsInCart] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { UsersLikesInfoUpdate } = useUserInfoMutations()

  const { data: userLikeData } = useQuery(
    QUERY_KEYS.USERS,
    () => {
      if (session) return fetchUserLikesInfo(session?.user.id)
    },
    {
      enabled: !!session,
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    }
  )

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
  }, [userLikeData])

  return (
    <ButtonCon>
      <LikeButtonCon>
        <LikeButton
          isliked={isLiked.toString()}
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
                  // 로그인 버튼을 눌렀을 때 이동할 URL
                  navigate('/login')
                }
              })
            }
          }}
        >
          <IoHeartSharp />
        </LikeButton>
      </LikeButtonCon>
      {isDateSelected ? (
        <ButtonOption2>
          <button
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

                    // 구매 내역을 Supabase에 저장

                    await addPurchaseHistory(session.user.id, purchaseDataArray)
                  }

                  // 확인 버튼을 눌렀을 때 이동할 URL
                  navigate('/shop')
                }
              })
            }}
          >
            바로 구매
          </button>
          {isInCart ? (
            <button
              type="button"
              onClick={() => {
                navigate('/cart')
              }}
            >
              장바구니에 있어요!
            </button>
          ) : (
            <button
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
                      // 로그인 버튼을 눌렀을 때 이동할 URL
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
              장바구니에 담기
            </button>
          )}
        </ButtonOption2>
      ) : (
        <ButtonOption1>
          <button type="button">수령일을 선택해주세요</button>
        </ButtonOption1>
      )}
    </ButtonCon>
  )
}

const ButtonCon = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
`

const LikeButtonCon = styled.div`
  margin-right: 8px;
  border: 1px solid rgba(210, 210, 210, 1);
  border-radius: 4px;
`
const LikeButton = styled.button<{ isliked: string }>`
  padding: 6px 6px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2.2rem;
  color: ${props =>
    props.isliked === 'true' ? 'rgb(253, 70, 108)' : 'rgba(210, 210, 210, 1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: ${props =>
      props.isliked === 'true' ? 'rgb(253, 0, 108)' : 'rgba(190, 190, 190, 1)'};
  }
`

const ButtonOption1 = styled.div`
  flex-grow: 1;
  button {
    cursor: pointer;
    width: 100%;
    background-color: rgba(30, 30, 30, 1);
    border: none;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 12px 0px;

    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`

const ButtonOption2 = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;

  button {
    cursor: pointer;
    width: 100%;
    border: none;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 12px 0px;

    &:first-of-type {
      background-color: #fff;
      color: rgba(30, 30, 30, 1);
      border: 1px solid rgba(190, 190, 190, 1);
      width: 49%;
    }

    &:last-of-type {
      background-color: rgba(30, 30, 30, 1);
      color: #fff;
      width: 49%;
    }

    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      font-size: 0.9rem;
      &:last-of-type {
        font-size: 0.8rem;
      }
    }
  }
`
