import styled from 'styled-components'

export default function Community() {
  return (
    <CommunityCon>
      <Header>내가 키우는 장미가 궁금하다.</Header>
    </CommunityCon>
  )
}

const CommunityCon = styled.div`
  margin-top: 100px;
  width: 100%;
`

const Header = styled.div`
  width: 100%;
  background-color: white;
`
