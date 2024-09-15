import styled from 'styled-components'

export default function Community() {
  return (
    <CommunityCon>
      <CommunityWrapper>
        <Header>내가 키우는 장미가 궁금하다.</Header>
      </CommunityWrapper>
    </CommunityCon>
  )
}

const CommunityCon = styled.div`
  margin-top: 100px;
  width: 100%;
  border: 1px solid red;
`
const CommunityWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  border: 1px solid blue;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: rgba(30, 30, 30, 1);
`
