import styled from 'styled-components'
import ItemFilterCon from '../Filter/ItemFilterCon'
import ItemListCon from '../Item/ItemListCon'
import { useRecoilState } from 'recoil'
import { filterState } from '../../recoil/atoms/FilterState'
import { RxCross2 } from 'react-icons/rx'

export default function MainSection() {
  const [filterData, setFilterState] = useRecoilState(filterState)

  return (
    <>
      <ShopMain>
        <ShopMainWrapper>
          <FilterSection>
            <ItemFilterCon />
          </FilterSection>
          <ItemSection>
            {Object.values(filterData).some(value => value !== null) && (
              <FilterWrapper>
                {Object.values(filterData).map((data, i) => {
                  if (data !== null) {
                    return (
                      <FilterText key={i}>
                        <FilterTitle>{data}</FilterTitle>
                        <FilterCancelIcon>
                          <RxCross2
                            onClick={() => {
                              const storedFilter =
                                localStorage.getItem('filter')
                              if (storedFilter !== null) {
                                const dataArray = JSON.parse(storedFilter)
                                const filteredDataArray = dataArray.filter(
                                  (obj: object) => {
                                    console.log(Object.values(obj)[0])
                                    console.log(data)

                                    return Object.values(obj)[0] !== data
                                  }
                                )

                                localStorage.setItem(
                                  'filter',
                                  JSON.stringify(filteredDataArray)
                                )
                              }

                              const entries = Object.entries(filterData)
                              entries.forEach(entry => {
                                if (entry[1] === data) {
                                  entry[1] = null
                                }
                              })
                              const newFilterObj = Object.fromEntries(entries)
                              setFilterState(prev => ({
                                ...prev,
                                ...newFilterObj,
                              }))
                            }}
                          />
                        </FilterCancelIcon>
                      </FilterText>
                    )
                  }
                  return null
                })}
              </FilterWrapper>
            )}
            <ItemListCon />
          </ItemSection>
        </ShopMainWrapper>
      </ShopMain>
    </>
  )
}

const ShopMain = styled.div``

const FilterSection = styled.section`
  min-width: 210px;
  max-height: 460px;
  position: sticky;
  top: 30px;

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

const ItemSection = styled.section``

const FilterWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: -10px 80px 30px;

  @media (max-width: 1024px) {
    width: 85%;
    margin: -14px 80px 26px;
  }

  @media (max-width: 980px) {
    margin: -18px 80px 22px;
  }

  @media (max-width: 930px) {
    display: none;
  }
`

const FilterText = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(240, 240, 240, 1);
  padding: 6px 10px 8px;
  cursor: pointer;
  margin-right: 14px;
  border-radius: 8px;
  color: rgba(70, 70, 70, 1);
  font-size: 0.9rem;
`

const FilterTitle = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 980px) {
    font-size: 0.7rem;
  }
`

const FilterCancelIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
  padding-top: 2px;
`

const ShopMainWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 50px;

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`
