import styled from 'styled-components'
import SearchItem from './SearchItem'
import { useQuery } from 'react-query'
import { fetchItems } from '../../config/api/items/fetchItems'
import { QUERY_KEYS } from '../../config/constants/queryKeys'

export default function SearchItemModal({ type }: { type: string }) {
  const { data, error, isLoading } = useQuery(QUERY_KEYS.PRODUCTS, fetchItems, {
    staleTime: Infinity,
    cacheTime: 30 * 60 * 1000,
  })

  if (isLoading)
    return (
      <SearchModalCon type={type}>
        {type !== 'wide' && (
          <SearchInputWraper>
            <input type="text" placeholder="상품 이름으로 검색해주세요." />
          </SearchInputWraper>
        )}
        <SearchItemList>Loading...</SearchItemList>
      </SearchModalCon>
    )

  if (error) return <div>Error...</div>

  if (data)
    return (
      <SearchModalCon type={type}>
        {type !== 'wide' && (
          <SearchInputWraper>
            <input type="text" placeholder="상품 이름으로 검색해주세요." />
          </SearchInputWraper>
        )}
        <SearchItemList>
          {data.map(item => (
            <SearchItem
              key={item.id}
              title={item.title}
              id={item.id}
              imgUrl={item.imgurl}
            />
          ))}
        </SearchItemList>
      </SearchModalCon>
    )
}

const SearchModalCon = styled.div<{ type?: string }>`
  background-color: #fff;
  padding: ${props => (props.type === 'wide' ? '0px 14px 16px' : '16px 14px')};
  border-radius: 10px;
  min-width: 350px;
`

const SearchInputWraper = styled.div`
  input {
    width: 100%;
    border: none;
    background-color: rgba(245, 245, 245, 1);
    padding: 8px 10px;
    font-size: 1rem;
    border-radius: 8px;

    &::placeholder {
      color: rgba(180, 180, 180, 1);
      font-size: 0.9rem;
    }

    &:focus {
      outline: none;
    }
  }
`

const SearchItemList = styled.ul`
  width: 100%;
`
