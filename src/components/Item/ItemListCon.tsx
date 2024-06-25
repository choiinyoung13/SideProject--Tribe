import styled from 'styled-components'
import ItemCard from './ItemCard'
import { fetchItemsPerPage } from '../../config/api/items/fetchItems'
import { useQuery } from 'react-query'
import { useAuth } from '../../hooks/useAuth'
import { fetchCartItems } from '../../config/api/cart/fetchCartItems'
import { QUERY_KEYS } from '../../config/constants/queryKeys'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CartItemType {
  itemId: number
  quantity: number
}

type BadgeType = 'hot' | 'fast'

interface ItemType {
  id: number
  title: string
  imgurl: string
  originalprice: number
  badge: BadgeType[]
  discount: number
}

export default function ItemListCon() {
  const { session } = useAuth()
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [itemData, setItemData] = useState<ItemType[]>([])
  const [pageParam, setPageParam] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const { data: cartData } = useQuery(QUERY_KEYS.CART_ITEMS, fetchCartItems, {
    enabled: !!session,
    staleTime: Infinity,
    cacheTime: 30 * 60 * 1000,
  })

  const fetchItems = useCallback(async () => {
    const response = await fetchItemsPerPage(pageParam)
    setItemData(prev => [...prev, ...response.items])
    setPageParam(
      response.nextCursor !== null ? response.nextCursor : prev => prev
    )
    setHasMore(response.nextCursor !== null)
  }, [pageParam])

  useEffect(() => {
    fetchItems()
  }, [])

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchItems()
      }
    },
    [hasMore, fetchItems]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    })

    const currentObserverRef = observerRef.current
    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [handleIntersection])

  const cartItems: CartItemType[] = cartData ? cartData.items : []

  return (
    <ListCon>
      <ListWrapper>
        {itemData.map(
          ({ id, title, imgurl, originalprice, badge, discount }) => {
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
              />
            )
          }
        )}
      </ListWrapper>
      <LoadingObserver ref={observerRef}>
        {hasMore && <img src={loadingIcon} alt="loading" />}
        {!hasMore && <div>No more flowers</div>}
      </LoadingObserver>
    </ListCon>
  )
}

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
  margin-top: 40px;
`
