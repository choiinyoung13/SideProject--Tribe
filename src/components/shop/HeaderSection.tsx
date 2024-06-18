import styled from 'styled-components'
import { Link, useSearchParams } from 'react-router-dom'
import { useRef } from 'react'
import FilterSection from './FilterSection'

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
      <ul>
        <li className={tab === null ? 'active' : ''}>
          <Link to={'/shop'}>전체</Link>
        </li>
        {categories.current.map((category, i) => {
          return (
            <li key={i} className={tab === String(i + 1) ? 'active' : ''}>
              <Link to={`/shop?tab=${i + 1}`}>{category}</Link>
            </li>
          )
        })}
      </ul>
      <FilterSection />
    </ShopHeader>
  )
}

const ShopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid rgba(220, 220, 220, 1);

  ul {
    display: flex;
    padding: 30px 60px 0px;
    font-size: 1rem;
    overflow-x: auto;
    min-width: 900px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    li {
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
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column-reverse;

     ul {
      padding: 0px;
      font-size: 0.9rem;
      min-width: 709px;
      border: 1px solid blue;
    

      li {
        margin-right: 30px;

        &.active {
          padding-bottom: 17px;
        }
      }
    }
  }
  }

  @media (max-width: 600px) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      padding: 0px 26px;
      font-size: 0.9rem;
      min-width: 709px;

      li {
        margin-right: 30px;

        &.active {
          padding-bottom: 17px;
        }
      }
    }
  }
`
