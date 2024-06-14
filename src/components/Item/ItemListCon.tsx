import styled from 'styled-components'
import ItemCard from './ItemCard'

export default function ItemListCon() {
  return (
    <ListCon>
      <ListWrapper>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
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
