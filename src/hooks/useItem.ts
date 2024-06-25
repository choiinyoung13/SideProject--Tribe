import { useCallback, useEffect, useState } from 'react'
import { fetchItemsPerPage } from '../config/api/items/fetchItems'
import { useInView } from 'react-intersection-observer'

type BadgeType = 'hot' | 'fast'

interface ItemType {
  id: number
  title: string
  imgurl: string
  originalprice: number
  badge: BadgeType[]
  discount: number
}

export const useItems = (tabNumber: number) => {
  const [itemData, setItemData] = useState<ItemType[]>([])
  const [pageParam, setPageParam] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.5 })

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const response = await fetchItemsPerPage(pageParam, 10, Number(tabNumber))
    setItemData(prev =>
      pageParam === 0 ? response.items : [...prev, ...response.items]
    )
    setPageParam(response.nextCursor !== null ? response.nextCursor : pageParam)
    setHasMore(response.nextCursor !== null)
    setLoading(false)
  }, [pageParam, tabNumber])

  useEffect(() => {
    setItemData([])
    setPageParam(0)
    setHasMore(true)
  }, [tabNumber])

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchItems()
    }
  }, [inView, fetchItems, hasMore, loading])

  return { itemData, loading, hasMore, ref }
}
