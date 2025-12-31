import { areAllValuesNull } from './areAllValuesNull'
import { priceCalculation } from './priceCalculation'

type badge = 'hot' | 'fast'

type SortableItem = {
  id: number
  originalprice: number
  discount: number
  badge: badge[]
  size: string
  color: string | null
  isLiked?: boolean
}

export const sortLowestId = <T extends { id: number }>(items: T[]): T[] => {
  return items.sort((a, b) => {
    const idA = a.id
    const idB = b.id
    return idA - idB
  })
}

export const sortLowestPrice = <
  T extends { originalprice: number; discount: number }
>(
  items: T[]
): T[] => {
  return items.sort((a, b) => {
    const priceA = priceCalculation(a.originalprice, a.discount)
    const priceB = priceCalculation(b.originalprice, b.discount)
    return priceA - priceB
  })
}

export const sortHighestPrice = <
  T extends { originalprice: number; discount: number }
>(
  items: T[]
): T[] => {
  return items.sort((a, b) => {
    const priceA = priceCalculation(a.originalprice, a.discount)
    const priceB = priceCalculation(b.originalprice, b.discount)
    return priceB - priceA
  })
}

export const sortHighestDiscountRate = <T extends { discount: number }>(
  items: T[]
): T[] => {
  return items.sort((a, b) => {
    const discountA = a.discount
    const discountB = b.discount
    return discountB - discountA
  })
}

interface filterObjTyep {
  color: string | null
  fast: string | null
  hot: string | null
  like: string | null
  price: string | null
  size: string | null
}

export const sortItmeByFilterObj = <T extends SortableItem>(
  items: T[],
  filterObj: filterObjTyep
): T[] => {
  let filtered = items

  if (filterObj.fast) {
    filtered = filtered.filter(item => item.badge.includes('fast'))
  }

  if (filterObj.hot) {
    filtered = filtered.filter(item => item.badge.includes('hot'))
  }

  if (filterObj.like) {
    filtered = filtered.filter(item => item.isLiked === true)
  }

  if (filterObj.size) {
    if (filterObj.size === 'Small') {
      filtered = filtered.filter(item => item.size === 'Small')
    }
    if (filterObj.size === 'Medium') {
      filtered = filtered.filter(item => item.size === 'Medium')
    }
    if (filterObj.size === 'Large') {
      filtered = filtered.filter(item => item.size === 'Large')
    }
  }

  if (filterObj.price) {
    if (filterObj.price === '5만원 이하') {
      filtered = filtered.filter(item => {
        return priceCalculation(item.originalprice, item.discount) <= 50000
      })
    }
    if (filterObj.price === '5만원~10만원') {
      filtered = filtered.filter(item => {
        return (
          priceCalculation(item.originalprice, item.discount) > 50000 &&
          priceCalculation(item.originalprice, item.discount) <= 100000
        )
      })
    }
    if (filterObj.price === '10만원 이상') {
      filtered = filtered.filter(item => {
        return priceCalculation(item.originalprice, item.discount) > 100000
      })
    }
  }

  if (filterObj.color) {
    if (filterObj.color === '빨강 계열') {
      filtered = filtered.filter(item => {
        return item.color === 'red'
      })
    }

    if (filterObj.color === '보라 계열') {
      filtered = filtered.filter(item => {
        return item.color === 'puple'
      })
    }

    if (filterObj.color === '흰색 계열') {
      filtered = filtered.filter(item => {
        return item.color === 'white'
      })
    }

    if (filterObj.color === '노랑 계열') {
      filtered = filtered.filter(item => {
        return item.color === 'yellow'
      })
    }

    if (filterObj.color === '초록 계열') {
      filtered = filtered.filter(item => {
        return item.color === 'green'
      })
    }

    if (filterObj.color === '파랑 계열') {
      filtered = filtered.filter(item => {
        return item.color === 'blue'
      })
    }

    if (filterObj.color === '혼합 컬러') {
      filtered = filtered.filter(item => {
        return item.color === 'mix'
      })
    }
  }

  if (areAllValuesNull(filterObj)) {
    filtered = items
  }

  return filtered
}
