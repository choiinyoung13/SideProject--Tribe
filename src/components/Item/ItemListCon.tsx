import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import ItemCard from './ItemCard'
import { useQuery, useInfiniteQuery } from 'react-query'
import { useAuth } from '../../hooks/useAuth'
import { fetchCartItems } from '../../config/api/cart/fetchCartItems'
import { QUERY_KEYS } from '../../config/constants/queryKeys'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'
import { fetchUserLikesInfo } from '../../config/api/user/fetchUserInfo'
import { useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sortState } from '../../recoil/atoms/SortState'

import {
  sortHighestDiscountRate,
  sortHighestPrice,
  sortItmeByFilterObj,
  sortLowestId,
  sortLowestPrice,
} from '../../utill/itemSort'
import { filterState } from '../../recoil/atoms/FilterState'
import { sortedItemsState } from '../../recoil/atoms/SortedItemsState'
import { CartItemType } from '../../types/CartItemType'
import { fetchItemsPerPage } from '../../config/api/items/fetchItems'

export default function ItemListCon() {
  const { session } = useAuth()
  const location = useLocation()
  const sortValue = useRecoilValue(sortState)
  const queryParams = new URLSearchParams(location.search)
  const filterData = useRecoilValue(filterState)
  const [sortedItems, setSortedItems] = useRecoilState(sortedItemsState)
  const tabValue = Number(queryParams.get('tab'))

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      ['items', tabValue],
      ({ pageParam = 0 }) => fetchItemsPerPage(pageParam, 10, tabValue),
      {
        getNextPageParam: lastPage => lastPage.nextCursor || undefined,
        staleTime: Infinity,
        cacheTime: 30 * 60 * 1000,
      }
    )

  const { data: userLikeData, isLoading: userInfoLoading } = useQuery(
    QUERY_KEYS.USERS,
    () => session && fetchUserLikesInfo(session.user.id),
    {
      enabled: !!session,
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    }
  )

  const { data: cartData, isLoading: cartLoading } = useQuery(
    QUERY_KEYS.CART_ITEMS,
    () => session && fetchCartItems(session.user.id),
    {
      enabled: !!session,
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    }
  )

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const fetchFilteredAndSortedItems = async () => {
      if (data) {
        let filteredItems = await sortItmeByFilterObj(
          [...data.pages.flatMap(page => page.items)],
          filterData
        )

        if (sortValue === '추천순') {
          filteredItems = sortLowestId(filteredItems)
        } else if (sortValue === '낮은가격순') {
          filteredItems = sortLowestPrice(filteredItems)
        } else if (sortValue === '높은가격순') {
          filteredItems = sortHighestPrice(filteredItems)
        } else if (sortValue === '할인률순') {
          filteredItems = sortHighestDiscountRate(filteredItems)
        }

        setSortedItems(filteredItems)
      }
    }

    if (data) {
      fetchFilteredAndSortedItems()
    }
  }, [sortValue, filterData, data])

  const cartItems: CartItemType[] = cartData ? cartData.items : []

  return (
    <>
      {cartLoading || (isLoading && !data) || userInfoLoading ? (
        <ListCon>
          <ListWrapper>
            <LoadingScreen>
              <img src={loadingIcon} alt="loading" />
            </LoadingScreen>
          </ListWrapper>
        </ListCon>
      ) : (
        <ListCon>
          <ListWrapper>
            {sortedItems.length === 0 ? (
              <Empty>해당하는 제품이 없습니다.</Empty>
            ) : (
              sortedItems.map(
                ({
                  id,
                  title,
                  imgurl,
                  originalprice,
                  badge,
                  discount,
                  deliveryperiod,
                }) => {
                  const isInCart = cartItems.some(item => item.itemId === id)
                  return (
                    <ItemCard
                      key={id}
                      id={id}
                      title={title}
                      imgurl={imgurl}
                      originalprice={originalprice}
                      badge={badge}
                      discount={discount}
                      isInCart={isInCart}
                      userLikeData={userLikeData?.likes}
                      deliveryPeriod={deliveryperiod}
                    />
                  )
                }
              )
            )}
          </ListWrapper>
          <LoadingObserver ref={observerRef}>
            {isLoading && <img src={loadingIcon} alt="loading" />}
            {!hasNextPage && <div></div>}
          </LoadingObserver>
        </ListCon>
      )}
    </>
  )
}

const LoadingScreen = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
  }

  @media (max-width: 1024px) {
    top: 45%;
    left: 70%;

    img {
      width: 80px;
    }
  }

  @media (max-width: 768px) {
    top: 300px;
    left: 50%;
    transform: translateX(0%);

    img {
      width: 90px;
    }
  }

  @media (max-width: 600px) {
    top: 300px;
    left: 40%;
    transform: translateX(0%);

    img {
      width: 80px;
    }
  }
`

const ListCon = styled.div`
  width: 100%;
  padding-left: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const LoadingObserver = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Empty = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`
