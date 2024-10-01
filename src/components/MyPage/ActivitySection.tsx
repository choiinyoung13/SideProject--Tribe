import styled from 'styled-components'
import { LikedPostsSection } from './LikedPostsSection'
import { MyPostsSection } from './MyPostsSection'
import { PurchaseHistorySection } from './PurchaseHistorySection'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ActivitySection() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const subTab = queryParams.get('subTab')
  const navigate = useNavigate()

  return (
    <Container>
      <Header>
        <TabWrapper>
          <Tab
            selected={subTab === null}
            onClick={() => {
              navigate('/mypage?tab=1')
            }}
          >
            좋아요 누른 게시물
          </Tab>
          <Tab
            selected={subTab === '1'}
            onClick={() => {
              navigate('/mypage?tab=1&subTab=1')
            }}
          >
            내가 올린 게시물
          </Tab>
          <Tab
            selected={subTab === '2'}
            onClick={() => {
              navigate('/mypage?tab=1&subTab=2')
            }}
          >
            구매 내역
          </Tab>
        </TabWrapper>
      </Header>

      <Main>
        {/* 좋아요 누른 게시물 */}
        {subTab === null && <LikedPostsSection />} {/* 내가 올린 게시물 */}
        {subTab === '1' && <MyPostsSection />} {/* 구매 내역 */}
        {subTab === '2' && <PurchaseHistorySection purchaseHistory={[]} />}
      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`

const Header = styled.header`
  max-width: 1080px;
  margin: 0 auto;
`

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  gap: 25px;
`

interface TabProps {
  selected: boolean
}

const Tab = styled.div<TabProps>`
  padding: 20px 0px;
  font-size: 0.95rem;
  cursor: pointer;
  border-bottom: ${props =>
    props.selected ? '2px solid rgba(0,0,0,1)' : 'none'};
  font-weight: ${props => (props.selected ? '700' : '400')};

  &:hover {
    border-bottom: 2px solid black;
  }

  @media (max-width: 1150px) {
    &:first-of-type {
      margin-left: 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 0px;
    font-size: 0.85rem;
  }
`

const Main = styled.main`
  margin: 0 auto;
  max-width: 1080px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`
