import styled from 'styled-components'
import { IoSearch } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import profile1 from '../assets/images/community/fake_profile/1.jpg'
import profile2 from '../assets/images/community/fake_profile/2.jpg'
import profile3 from '../assets/images/community/fake_profile/3.jpg'
import PostListCon from '../components/Community/PostListCon'
import RealTimeKeywords from '../components/Community/RealTimeKeywords'

export default function Community() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get('tab')

  const categories = [
    { id: 1, title: '전체', count: 218 },
    { id: 2, title: '잡담', count: 54 },
    { id: 3, title: '이벤트', count: 101 },
    { id: 4, title: '질문', count: 108 },
    { id: 5, title: '나눔', count: 60 },
  ]

  return (
    <CommunityCon>
      <Sidebar>
        {categories.map(cat => {
          return (
            <Link
              to={
                cat.title === '전체'
                  ? '/community'
                  : `/community?tab=${cat.id - 1}`
              }
              key={cat.id}
            >
              <NavItem isActive={Number(tab) === cat.id - 1}>
                {cat.title}({cat.count})
              </NavItem>
            </Link>
          )
        })}
      </Sidebar>

      <MainContent>
        <PostInputWrapper>
          <PostInput placeholder="새로운 글을 작성하세요... (식물 정보, 질문 등)" />
          <PostButton>글쓰기</PostButton>
        </PostInputWrapper>
        <Feed>
          <PostListCon />
        </Feed>
      </MainContent>

      <RightSidebar>
        <InputWrapper>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>
          <Input placeholder="식물 관련 키워드 입력" />
        </InputWrapper>
        <WidgetWrapper>
          <WidgetTitle>실시간 인기 키워드</WidgetTitle>
          <Widget>
            <RealTimeKeywords />
          </Widget>
        </WidgetWrapper>
        <WidgetWrapper>
          <WidgetTitle>이웃 추천</WidgetTitle>
          <Widget>
            <FollowRecommend>
              <FollowRecommendLeft>
                <Profile src={profile1} />
                <TextSection>
                  <UserName>dlsdud156</UserName>
                  <Description>풀과 달, 식물과 제철 그리고 고양이</Description>
                </TextSection>
              </FollowRecommendLeft>
              <FollowRecommendRight>
                <FollowBtn>팔로잉</FollowBtn>
              </FollowRecommendRight>
            </FollowRecommend>
            <FollowRecommend>
              <FollowRecommendLeft>
                <Profile src={profile2} />
                <TextSection>
                  <UserName>chldls153</UserName>
                  <Description>풀과 달, 식물과 제철 그리고 고양이</Description>
                </TextSection>
              </FollowRecommendLeft>
              <FollowRecommendRight>
                <FollowBtn>팔로잉</FollowBtn>
              </FollowRecommendRight>
            </FollowRecommend>
            <FollowRecommend>
              <FollowRecommendLeft>
                <Profile src={profile3} />
                <TextSection>
                  <UserName>alscjf448</UserName>
                  <Description>풀과 달, 식물과 제철 그리고 고양이</Description>
                </TextSection>
              </FollowRecommendLeft>
              <FollowRecommendRight>
                <FollowBtn>팔로잉</FollowBtn>
              </FollowRecommendRight>
            </FollowRecommend>
          </Widget>
        </WidgetWrapper>
      </RightSidebar>
    </CommunityCon>
  )
}

// 전체 레이아웃 컨테이너
const CommunityCon = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  margin-top: 100px;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);

  background-color: #f4f4f4;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`

// 왼쪽 사이드바
const Sidebar = styled.div`
  width: 250px;
  padding: 30px;
  background-color: #ffffff;
  border-right: 1px solid #e1e1e1;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e1e1e1;
  }
`

interface NavItemProps {
  isActive: boolean
}

const NavItem = styled.div<NavItemProps>`
  margin: 30px 0;
  font-size: 1rem;
  color: ${props =>
    props.isActive ? 'rgba(60, 60, 60, 1)' : 'rgba(130, 130, 130, 1)'};
  cursor: pointer;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    color: rgba(60, 60, 60, 1);
    font-weight: bold;
  }

  &:nth-child(1) {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 1rem;
  }
`

// 중앙 메인 컨텐츠 영역
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`

const PostInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const PostInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  resize: none;
  font-size: 1rem;
  outline: none;

  @media (max-width: 768px) {
    height: 100px;
  }
`

const PostButton = styled.button`
  width: 90px;
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #141414;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #242424;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`

// 게시글 피드
const Feed = styled.div`
  margin-top: 20px;
`

// 오른쪽 사이드바
const RightSidebar = styled.div`
  width: 350px;
  padding: 30px;
  background-color: #ffffff;
  border-left: 1px solid #e1e1e1;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    display: none;
  }
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const SearchIcon = styled.div`
  font-size: 1rem;
  color: rgba(150, 150, 150, 1);
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  left: 13px;
`

const Input = styled.input`
  width: 100%;
  background-color: #f4f4f4;
  border: none;
  border-radius: 6px;
  padding: 10px 14px 10px 36px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(150, 150, 150, 1);
  }
`

const WidgetWrapper = styled.div`
  background-color: #f4f4f4;
  padding: 17px;
  margin-bottom: 20px;
  border-radius: 6px;
`

const WidgetTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
`

const Widget = styled.div`
  margin-top: 14px;
`

const WidgetItem = styled.div`
  padding: 16px 0;
  font-size: 0.9rem;
  color: #333;
  border-bottom: 1px solid #e1e1e1;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
    padding: 14px 0 2px 0;
  }

  &:hover {
    color: #1e90ff;
  }
`

const FollowRecommend = styled.div`
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`
const Profile = styled.img`
  width: 43px;
  height: 43px;
  border-radius: 50%;
`
const TextSection = styled.div`
  width: 150px;
  margin-left: 8px;
`
const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: rgba(30, 30, 30, 1);
`
const Description = styled.div`
  font-size: 0.7rem;
  font-weight: thin;
  margin-top: 6px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FollowRecommendLeft = styled.div`
  display: flex;
  align-items: center;
`
const FollowRecommendRight = styled.div``

const FollowBtn = styled.button`
  background-color: #141414;
  color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(50, 50, 50, 1);
  }
`
