'use client'

import { useRef } from 'react'
import { useShopFilterStore } from '@/store/shopFilter.store'
import { useShallow } from 'zustand/react/shallow'

interface SelectOptionBoxPropsType {
  type: 'size' | 'price' | 'color'
  onSelect?: () => void
}

function getDataByType(type: string) {
  if (type === 'size') {
    return [
      { title: 'size', ko: '사이즈', value: 'All', checked: false },
      { title: 'size', ko: '사이즈', value: 'Small', checked: false },
      { title: 'size', ko: '사이즈', value: 'Medium', checked: false },
      { title: 'size', ko: '사이즈', value: 'Large', checked: false },
    ]
  } else if (type === 'price') {
    return [
      { title: 'price', ko: '가격', value: 'All', checked: false },
      { title: 'price', ko: '가격', value: '5만원 이하', checked: false },
      {
        title: 'price',
        ko: '가격',
        value: '5만원~10만원',
        checked: false,
      },
      { title: 'price', ko: '가격', value: '10만원 이상', checked: false },
    ]
  } else if (type === 'color') {
    return [
      { title: 'color', ko: '컬러', value: 'All', checked: false },
      { title: 'color', ko: '컬러', value: '빨강 계열', checked: false },
      { title: 'color', ko: '컬러', value: '보라 계열', checked: false },
      { title: 'color', ko: '컬러', value: '흰색 계열', checked: false },
      { title: 'color', ko: '컬러', value: '노랑 계열', checked: false },
      { title: 'color', ko: '컬러', value: '초록 계열', checked: false },
      { title: 'color', ko: '컬러', value: '파랑 계열', checked: false },
      { title: 'color', ko: '컬러', value: '혼합 컬러', checked: false },
    ]
  }
}

export default function SelectOptionBox({
  type,
  onSelect,
}: SelectOptionBoxPropsType) {
  const sizeDatas = useRef(getDataByType(type))
  const filterDataState = useShopFilterStore(
    useShallow(s => ({
      fast: s.fast,
      hot: s.hot,
      like: s.like,
      size: s.size,
      price: s.price,
      color: s.color,
    }))
  )
  const setFilter = useShopFilterStore(s => s.setFilter)

  interface DataType {
    title: string
    ko: string
    value: string
    checked: boolean
  }

  if (sizeDatas.current === undefined) return null

  return (
    <div>
      {sizeDatas.current.map((data: DataType, i: number) => {
        const selected = filterDataState[type]
        const isAll = data.value === 'All'
        const checked = isAll ? selected === null : selected === data.value

        return (
          <div key={i} className="mt-[10px] mb-[10px] flex items-center ">
            <input
              type="radio"
              id={String(i) + data.value}
              name={type}
              checked={checked}
              onChange={() => {
                // "All" is represented as null in the store
                setFilter({ [data.title]: isAll ? null : data.value })
                onSelect?.()
              }}
            />
            <label
              className="text-[0.9rem] font-[300] ml-[5px] text-[rgba(40,40,40,1)]"
              htmlFor={String(i) + data.value}
            >
              {isAll ? 'All' : data.value}
            </label>
          </div>
        )
      })}
    </div>
  )
}
