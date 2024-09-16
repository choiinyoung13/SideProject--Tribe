import styled from 'styled-components'

export default function Community() {
  return (
    <CommunityCon>
      <Sidebar>
        <NavItem>전체(218)</NavItem>
        <NavItem>잡담(54)</NavItem>
        <NavItem>이벤트(101)</NavItem>
        <NavItem>질문(108)</NavItem>
        <NavItem>나눔(60)</NavItem>
      </Sidebar>

      <MainContent>
        <PostInputWrapper>
          <PostInput placeholder="새로운 글을 작성하세요... (식물 정보, 질문 등)" />
          <PostButton>글쓰기</PostButton>
        </PostInputWrapper>

        <Feed>
          <PostCard>
            <PostHeader>사용자1</PostHeader>
            <PostBody>내가 키우는 장미가 너무 예쁘게 피었어요!</PostBody>
            <PostFooter>2시간 전</PostFooter>
          </PostCard>

          <PostCard>
            <PostHeader>사용자2</PostHeader>
            <PostBody>새로운 식물 구입 고민중인데 추천 좀 해주세요!</PostBody>
            <PostFooter>4시간 전</PostFooter>
          </PostCard>
          <PostCard>
            <PostHeader>사용자1</PostHeader>
            <PostBody>내가 키우는 장미가 너무 예쁘게 피었어요!</PostBody>
            <PostFooter>2시간 전</PostFooter>
          </PostCard>

          <PostCard>
            <PostHeader>사용자2</PostHeader>
            <PostBody>새로운 식물 구입 고민중인데 추천 좀 해주세요!</PostBody>
            <PostFooter>4시간 전</PostFooter>
          </PostCard>
          <PostCard>
            <PostHeader>사용자1</PostHeader>
            <PostBody>내가 키우는 장미가 너무 예쁘게 피었어요!</PostBody>
            <PostFooter>2시간 전</PostFooter>
          </PostCard>

          <PostCard>
            <PostHeader>사용자2</PostHeader>
            <PostBody>새로운 식물 구입 고민중인데 추천 좀 해주세요!</PostBody>
            <PostFooter>4시간 전</PostFooter>
          </PostCard>
          <PostCard>
            <PostHeader>사용자1</PostHeader>
            <PostBody>내가 키우는 장미가 너무 예쁘게 피었어요!</PostBody>
            <PostFooter>2시간 전</PostFooter>
          </PostCard>

          <PostCard>
            <PostHeader>사용자2</PostHeader>
            <PostBody>새로운 식물 구입 고민중인데 추천 좀 해주세요!</PostBody>
            <PostFooter>4시간 전</PostFooter>
          </PostCard>
        </Feed>
      </MainContent>

      <RightSidebar>
        <WidgetTitle>인기 식물 정보</WidgetTitle>
        <Widget>
          <WidgetItem>#몬스테라 관리법</WidgetItem>
          <WidgetItem>#다육이 물주기 팁</WidgetItem>
          <WidgetItem>#식물 병충해 방지</WidgetItem>
        </Widget>
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
  padding: 26px;
  background-color: #ffffff;
  border-right: 1px solid #e1e1e1;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e1e1e1;
  }
`

const NavItem = styled.div`
  margin: 26px 0;
  font-size: 1rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #1e90ff;
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
  background-color: #1e90ff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #1c86ee;
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

const PostCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const PostHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  font-size: 1.1rem;
`

const PostBody = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`

const PostFooter = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`

// 오른쪽 사이드바
const RightSidebar = styled.div`
  width: 250px;
  padding: 26px;
  background-color: #ffffff;
  border-left: 1px solid #e1e1e1;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    display: none;
  }
`

const WidgetTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`

const Widget = styled.div`
  margin-top: 10px;
`

const WidgetItem = styled.div`
  padding: 10px 0;
  font-size: 0.9rem;
  color: #333;
  border-bottom: 1px solid #e1e1e1;
  cursor: pointer;

  &:hover {
    color: #1e90ff;
  }
`
