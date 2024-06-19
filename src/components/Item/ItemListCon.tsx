import styled from 'styled-components'
import ItemCard from './ItemCard'
import { fetchItems } from '../../utill/fetchItems'
import { useQuery } from 'react-query'

export default function ItemListCon() {
  const { data, error, isLoading } = useQuery('tribe_items', fetchItems, {
    staleTime: Infinity,
    cacheTime: 30 * 60 * 1000,
  })

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error...</div>

  if (data)
    return (
      <ListCon>
        <ListWrapper>
          {data.map(({ id, title, imgurl, originalprice, badge, discount }) => {
            return (
              <ItemCard
                key={id}
                id={id}
                title={title}
                imgurl={imgurl}
                originalprice={originalprice}
                badge={badge}
                discount={discount}
              />
            )
          })}
        </ListWrapper>
      </ListCon>
    )
}

const ListCon = styled.div`
  width: 100%;
  padding-left: 55px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
`
