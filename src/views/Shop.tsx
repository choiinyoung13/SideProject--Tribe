import styled from 'styled-components'
import Banner from '../components/banner/Banner'
import { Link, useSearchParams } from 'react-router-dom'
import { useRef } from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import { IoSearch } from 'react-icons/io5'
import useWindowWidth from '../hooks/useWindowWidth'
import ItemFilterCon from '../components/filter/ItemFilterCon'
import ItemListCon from '../components/item/ItemListCon'

export default function Shop() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const windowWidth = useWindowWidth()

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
    <>
      <Banner />
      {windowWidth <= 1024 && (
        <FilterCon>
          <input type="text" placeholder="상품 이름으로 검색해주세요." />
          <BiSortAlt2 color="rgba(80,80,80,1)" size={27} />
        </FilterCon>
      )}
      <ShopCon>
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
          {windowWidth > 1024 && (
            <FilterCon>
              <div>
                <span>신상품순</span>
                <BiSortAlt2 color="rgba(80,80,80,1)" />
              </div>
              <IoSearch color="rgba(80,80,80,1)" cursor={'pointer'} />
            </FilterCon>
          )}
        </ShopHeader>
        <ShopMain>
          <FilterSection>
            <ItemFilterCon />
          </FilterSection>
          <ItemSection>
            <ItemListCon />
          </ItemSection>
        </ShopMain>
      </ShopCon>
    </>
  )
}

const ShopCon = styled.div`
  position: relative;
  top: 115px;
  width: 100%;
  z-index: 97;

  @media (max-width: 1024px) {
    top: 0px;
  }

  @media (max-width: 768px) {
    top: 0px;
  }

  @media (max-width: 600px) {
    top: 0px;
  }
`

const ShopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  border-bottom: 1px solid rgba(220, 220, 220, 1);

  ul {
    display: flex;
    padding: 30px 60px 0px;
    font-size: 1rem;
    min-width: 900px;

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

const FilterCon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: rgba(90, 90, 90, 1);
  padding-top: 6px;
  margin-right: 66px;

  div {
    display: flex;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
    min-width: 70px;
    
  }

  span {
    font-size: 0.9rem;
    margin-right: 2px;
  }

  
  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 75px;
    padding: 34px 20px 0px 30px;
    

    input {
      width: 100%;
      padding: 10px 16px;
      margin-right: 14px;
      font-size: 0.9rem;
      border: none;
      border-radius: 4px;
      background-color: rgba(240,240,240,1)
    }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 60px;
    padding: 34px 20px 0px 30px;
    }

  @media (max-width: 600px) {
    position: relative;
    margin-top: 80px;
    padding: 0px 10px 26px 26px;

    input {
      width: 100%;
      padding: 10px 16px;
      margin-right: 14px;
      font-size: 0.9rem;
      border: none;
      border-radius: 4px;
      background-color: rgba(245,245,245,1);

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: rgba(180,180,180,1);
      }
    }
`

const ShopMain = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 50px;

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`

const FilterSection = styled.section`
  min-width: 210px;

  @media (max-width: 1024px) {
    width: 140px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

const ItemSection = styled.section`
  flex-grow: 1;
`
