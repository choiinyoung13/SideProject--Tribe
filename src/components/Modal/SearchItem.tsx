import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function SearchItem({
  title,
  id,
  imgUrl,
}: {
  title: string
  id: number
  imgUrl: string
}) {
  const navigate = useNavigate()

  return (
    <SearchItemCon
      onClick={e => {
        e.stopPropagation()
        console.log(1)
        navigate(`/product/${id}`)
      }}
    >
      <Img>
        <img src={imgUrl} alt="" />
      </Img>
      <Text>{title}</Text>
    </SearchItemCon>
  )
}

const SearchItemCon = styled.li`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid rgba(220, 220, 220, 1);
  cursor: pointer;
  display: flex;
  align-items: center;

  &:last-of-type {
    border: none;
    padding: 18px 0px 0px;
  }
`

const Img = styled.div`
  width: 46px;

  img {
    width: 100%;
    border-radius: 10px;
  }
`
const Text = styled.span`
  margin-left: 14px;
  color: rgba(60, 60, 60, 1);
  font-size: 0.9rem;

  &:hover {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
    font-size: 1rem;
  }
`
