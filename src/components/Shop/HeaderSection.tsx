import styled from 'styled-components'
import { Link, useSearchParams } from 'react-router-dom'
import { useRef } from 'react'
import FilterSection from '../Shop/FilterSection'

export default function HeaderSection() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const categories = useRef([
    '이벤트',
    '선물용',
    '인테리어용',
    '랭킹',
    '추천',
    '화환/식물',
    '화분자재류',
    '원예자재류',
  ])

  return (
    <ShopHeader>
      <CategoryWrapper>
        <CategoryList>
          <CategoryListItem className={tab === null ? 'active' : ''}>
            <Link to={'/shop'}>전체</Link>
          </CategoryListItem>
          {categories.current.map((category, i) => {
            return (
              <CategoryListItem
                key={i}
                className={tab === String(i + 1) ? 'active' : ''}
              >
                <Link to={`/shop?tab=${i + 1}`}>{category}</Link>
              </CategoryListItem>
            )
          })}
        </CategoryList>
      </CategoryWrapper>
      <FilterSection />
    </ShopHeader>
  )
}

const ShopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid rgba(220, 220, 220, 1);

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`

const CategoryWrapper = styled.div`
  @media (max-width: 1024px) {
    width: 100%;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const CategoryList = styled.ul`
  display: flex;
  padding: 30px 60px 0px;
  font-size: 1rem;
  min-width: 900px;

  @media (max-width: 1024px) {
    padding: 20px 40px 0px;
    font-size: 0.9rem;
    min-width: 768px;
  }

  @media (max-width: 768px) {
    ul {
      padding: 20px 40px 0px;
      font-size: 0.9rem;
      min-width: 600px;
    }
  }

  @media (max-width: 600px) {
    ul {
      padding: 0px 26px;
      font-size: 0.9rem;
      min-width: 740px;
    }
  }
`

const CategoryListItem = styled.li`
  margin-right: 38px;
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  &.active {
    font-weight: bold;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(20, 20, 20, 1);
  }

  @media (max-width: 1024px) {
    margin-right: 33.9px;

    &:last-of-type {
      margin-right: 0;
    }

    &.active {
      padding-bottom: 17px;
    }
  }
`
