import styled from 'styled-components'
import Badge from '../Common/Badge'
import ItemFilter from './ItemFilter'
import { useSetRecoilState } from 'recoil'
import { filterState } from '../../recoil/atoms/FilterState'

export default function ItemFilterCon() {
  const setFilterState = useSetRecoilState(filterState)

  return (
    <div>
      <BadgeFilterCon>
        <Title>필터</Title>
        <BadgeWrapper
          onClick={() => {
            const storedFilter = localStorage.getItem('filter')
            if (storedFilter !== null) {
              const index = JSON.parse(storedFilter).findIndex(
                (item: object) => {
                  return Object.keys(item)[0] === 'fast'
                }
              )

              if (index === -1) {
                const dataArray = JSON.parse(storedFilter)
                dataArray.push({ fast: '빠른배송' })
                localStorage.setItem('filter', JSON.stringify(dataArray))

                const newFilterState = dataArray.reduce(
                  (
                    acc: { [x: string]: unknown },
                    cur: { [x: string]: unknown }
                  ) => {
                    const key = Object.keys(cur)[0]
                    acc[key] = cur[key]
                    return acc
                  },
                  {}
                )

                setFilterState(prevState => ({
                  ...prevState,
                  ...newFilterState,
                }))
              } else return
            } else {
              localStorage.setItem(
                'filter',
                JSON.stringify([{ fast: '빠른배송' }])
              )
            }
          }}
        >
          <Badge badgeType="fast" />
        </BadgeWrapper>
        <BadgeWrapper
          onClick={() => {
            const storedFilter = localStorage.getItem('filter')
            if (storedFilter !== null) {
              const index = JSON.parse(storedFilter).findIndex(
                (item: object) => {
                  return Object.keys(item)[0] === 'hot'
                }
              )

              if (index === -1) {
                const dataArray = JSON.parse(storedFilter)
                dataArray.push({ hot: '인기상품' })
                localStorage.setItem('filter', JSON.stringify(dataArray))

                const newFilterState = dataArray.reduce(
                  (
                    acc: { [x: string]: unknown },
                    cur: { [x: string]: unknown }
                  ) => {
                    const key = Object.keys(cur)[0]
                    acc[key] = cur[key]
                    return acc
                  },
                  {}
                )

                setFilterState(prevState => ({
                  ...prevState,
                  ...newFilterState,
                }))
              } else return
            } else {
              localStorage.setItem(
                'filter',
                JSON.stringify([{ hot: '인기상품' }])
              )
            }
          }}
        >
          <Badge badgeType="hot" />
        </BadgeWrapper>
      </BadgeFilterCon>
      <ItemFilter type="size" />
      <ItemFilter type="price" />
      <ItemFilter type="color" />
    </div>
  )
}

const BadgeFilterCon = styled.div`
  margin-bottom: 8px;
`

const BadgeWrapper = styled.div`
  margin-bottom: 10px;
  width: 88px;
  cursor: pointer;

  &:hover {
    div {
      border: 1px solid rgba(130, 130, 130, 1);
      p {
        color: black;
      }
    }
  }

  &:last-of-type {
    margin-bottom: 0px;
  }
`

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 16px;
`
