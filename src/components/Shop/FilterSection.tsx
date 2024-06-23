import styled from 'styled-components'
import { BiSortAlt2 } from 'react-icons/bi'
import { IoSearch } from 'react-icons/io5'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { WebSortModalState } from '../../recoil/atoms/WebSortModalState'
import { sortState } from '../../recoil/atoms/SortState'
import useWindowWidth from '../../hooks/useWindowWidth'
import SearchItemModal from '../Modal/SearchItemModal'
import { useState, useEffect, useCallback } from 'react'
import throttle from 'lodash/throttle'

export default function FilterSection() {
  const windowWidth = useWindowWidth()
  const setSortModalOpened = useSetRecoilState(WebSortModalState)
  const [sortDataState] = useRecoilState(sortState)
  const [inputModalOpened, setInputModalOpened] = useState(false)
  const [inputMode, setInputMode] = useState<'wide' | 'narrow'>(
    windowWidth <= 1024 ? 'wide' : 'narrow'
  )

  const handleResize = useCallback(
    throttle(() => {
      setInputMode(window.innerWidth <= 1024 ? 'wide' : 'narrow')
      if (window.innerWidth > 1024) {
        setInputModalOpened(false)
      }
    }, 200),
    []
  )

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  useEffect(() => {
    setInputMode(windowWidth <= 1024 ? 'wide' : 'narrow')
    if (windowWidth > 1024) {
      setInputModalOpened(false)
    }
  }, [windowWidth])

  useEffect(() => {
    console.log(inputMode)
  }, [inputMode])

  return (
    <>
      <FilterCon>
        {windowWidth <= 1024 ? (
          <>
            <SearchInputWrapper>
              <SearchInput
                type="text"
                placeholder="상품 이름으로 검색해주세요."
                onFocus={() => {
                  if (inputMode === 'wide') {
                    setInputModalOpened(true)
                  }
                }}
                onBlur={() => {
                  setInputModalOpened(false)
                }}
              />
              {inputModalOpened && inputMode === 'wide' ? (
                <SearchItemWrapper
                  type={'wide'}
                  onMouseDown={e => {
                    e.preventDefault()
                  }}
                >
                  <SearchItemModal type={'wide'} />
                </SearchItemWrapper>
              ) : null}
            </SearchInputWrapper>
            <BiSortAlt2
              color="rgba(140,140,140,1)"
              size={27}
              cursor={'pointer'}
              onClick={() => {
                setSortModalOpened(prev => !prev)
              }}
            />
          </>
        ) : (
          <>
            <SortFilter
              onClick={() => {
                setSortModalOpened(prev => !prev)
              }}
            >
              <span>{sortDataState}</span>
              <BiSortAlt2 color="rgba(80,80,80,1)" />
            </SortFilter>
            <SearchIcon>
              <IoSearch
                color="rgba(80,80,80,1)"
                cursor={'pointer'}
                onClick={() => {
                  setInputModalOpened(prev => !prev)
                }}
              />
              {inputModalOpened && inputMode === 'narrow' ? (
                <SearchItemWrapper type={'narrow'}>
                  <SearchItemModal type={'narrow'} />
                </SearchItemWrapper>
              ) : null}
            </SearchIcon>
          </>
        )}
      </FilterCon>
    </>
  )
}

const FilterCon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: rgba(90, 90, 90, 1);
  padding-top: 6px;
  margin-right: 76px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 20px 30px 0px;
    margin: 0px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 60px;
    padding: 34px 20px 0px 30px;
  }

  @media (max-width: 600px) {
    position: relative;
    margin-top: 80px;
    padding: 0px 10px 0px 26px;
  }
`

const SortFilter = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  min-width: 100px;

  span {
    font-size: 0.9rem;
    margin-right: 2px;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin-right: 14px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(240, 240, 240, 1);

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 16px;
    margin-right: 14px;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    background-color: rgba(245, 245, 245, 1);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba(180, 180, 180, 1);
    }
  }
`

const SearchIcon = styled.div`
  position: relative;
`

const SearchItemWrapper = styled.div<{ type?: string }>`
  position: absolute;
  top: ${props => (props.type === 'wide' ? '38px' : '26px')};
  left: ${props => (props.type === 'wide' ? '0px' : '-330px')};
  width: 100%;
  min-width: 350px;
  height: ${props => (props.type === 'wide' ? '272px' : '329px')};
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10000;
  border-radius: 10px;
  box-shadow: 5px 5px 20px rgba(30, 30, 30, 0.3);
  background-color: #fff;
`

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-right: 14px;
`
