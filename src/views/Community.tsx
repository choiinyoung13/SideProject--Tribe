import styled from 'styled-components'
import { IoSearch } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import PostListCon from '../components/Community/PostListCon'
import RealTimeKeywords from '../components/Community/RealTimeKeywords'
import FollowRecommends from '../components/Community/FollowRecommends'
import SortButton from '../components/Community/SortButton'
import useWindowWidth from '../hooks/useWindowWidth'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import PostModal from '../components/Community/PostModal' // PostModal 컴포넌트 추가

export default function Community() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get('tab')
  const windowWidth = useWindowWidth()

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    { id: 1, title: '전체', count: 309 },
    { id: 2, title: '잡담', count: 54 },
    { id: 3, title: '이벤트', count: 101 },
    { id: 4, title: '질문', count: 108 },
    { id: 5, title: '나눔', count: 60 },
    { id: 6, title: '정보', count: 91 },
  ]

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true)
  }

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <CommunityCon>
      {windowWidth >= 768 ? (
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
      ) : (
        <SelectSection>
          <Select>
            {categories.map(category => {
              return (
                <option>
                  {category.title}
                  {`(${category.count})`}
                </option>
              )
            })}
          </Select>
          <DownIcon>
            <FaChevronDown />
          </DownIcon>
        </SelectSection>
      )}
      <MainContent>
        <MainContentHeader>
          <HeaderLeft>
            <InputWrapper>
              <SearchIcon>
                <IoSearch />
              </SearchIcon>
              <Input placeholder="궁금한 키워드 입력" />
            </InputWrapper>
          </HeaderLeft>
          <HeaderRight>
            <SortButton />
            <PostButton onClick={openModal}>글쓰기</PostButton>{' '}
            {/* 모달 열기 */}
          </HeaderRight>
        </MainContentHeader>
        <Feed>
          <PostListCon />
        </Feed>
      </MainContent>
      <RightSidebar>
        <WidgetWrapper>
          <WidgetTitle>실시간 인기 키워드</WidgetTitle>
          <Widget>
            <RealTimeKeywords />
          </Widget>
        </WidgetWrapper>
        <WidgetWrapper>
          <WidgetTitle>이웃 추천</WidgetTitle>
          <Widget>
            <FollowRecommends />
          </Widget>
        </WidgetWrapper>
      </RightSidebar>
      {/* 글쓰기 모달 */}
      {isModalOpen && <PostModal onClose={closeModal} />} {/* 모달 컴포넌트 */}
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
  width: 200px;
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

const SelectSection = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px;
`
const Select = styled.select`
  width: 100%;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
  margin-top: 10px;
  appearance: none;

  &:focus {
    outline: none;
  }
`

const DownIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  right: 20px;
  color: rgba(50, 50, 50, 1);
  font-size: 0.9rem;
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

const MainContentHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 8;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 12px;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex: 1;
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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
  background-color: #fff;
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

const PostButton = styled.button`
  width: 70px;
  padding: 6px 10px;
  background-color: #141414;
  font-size: 0.85rem;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 16px;

  &:hover {
    background-color: #242424;
  }

  @media (max-width: 1919px) {
    margin-left: 26px;
  }

  @media (max-width: 768px) {
    margin-left: 12px;
  }
`

// 게시글 피드
const Feed = styled.div`
  margin-top: 20px;
`

// 오른쪽 사이드바
const RightSidebar = styled.div`
  width: 350px;
  padding: 30px 22px;
  background-color: #ffffff;
  border-left: 1px solid #e1e1e1;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    display: none;
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
  margin-bottom: 20px;
`

const Widget = styled.div`
  margin-top: 14px;
`
