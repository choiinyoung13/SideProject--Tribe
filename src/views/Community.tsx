import styled from 'styled-components'
import { IoSearch } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PostListCon from '../components/Community/PostListCon'
import RealTimeKeywords from '../components/Community/RealTimeKeywords'
import FollowRecommends from '../components/Community/FollowRecommends'
import SortButton from '../components/Community/SortButton'
import useWindowWidth from '../hooks/useWindowWidth'
import { useEffect, useState } from 'react'
import PostModal from '../components/Community/PostModal' // PostModal 컴포넌트 추가
import { useAuth } from '../hooks/useAuth'
import Swal from 'sweetalert2'
import aside_image from '../assets/images/community/aside/user.png'
import aside_image2 from '../assets/images/community/aside/stats.png'
import { useQuery } from 'react-query'
import { fetchPostCategories } from '../config/api/post/fetchPostCategories'
import { CategorySkeletonUi } from '../components/Community/CategorySkeletonUi'

export default function Community() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get('tab')
  const windowWidth = useWindowWidth()
  const { session } = useAuth()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState<string>('')
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  // 카테고리 데이터 패칭
  const { data: categories, isLoading: isCategoryLoading } = useQuery(
    ['categories'],
    fetchPostCategories,
    {
      staleTime: 0,
      cacheTime: 0,
    }
  )

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 모달 열기 함수
  const openModal = () => {
    if (!session) {
      Swal.fire({
        text: '로그인 후 사용 가능한 기능입니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1E1E1E',
        cancelButtonColor: '#1E1E1E',
        confirmButtonText: '로그인',
        cancelButtonText: '닫기',
        scrollbarPadding: false,
      }).then(result => {
        if (result.isConfirmed) {
          // 로그인 버튼을 눌렀을 때 이동할 URL
          navigate('/login')
        }
      })
      return
    }
    setIsModalOpen(true)
  }

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // 검색어 제출 시 실행되는 함수
  const onInputValueSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() && inputValue === '') {
      Swal.fire({
        text: '검색어를 입력하세요.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '닫기',
        scrollbarPadding: false,
      })
      return
    }
    setSearchKeyword(inputValue.trim())
  }

  useEffect(() => {
    setInputValue('')
    setSearchKeyword('')
  }, [tab])

  if (!categories) {
    return null
  }

  return (
    <CommunityCon>
      {windowWidth >= 768 ? (
        <Sidebar>
          {isCategoryLoading ? (
            <CategorySkeletonUi /> // 카테고리 데이터를 불러오는 동안 보여줄 Skeleton UI
          ) : (
            categories.map(cat => {
              return (
                <Link
                  to={
                    cat.title === '전체'
                      ? '/community'
                      : `/community?tab=${cat.id}`
                  }
                  key={cat.id}
                >
                  <NavItem isActive={Number(tab) === cat.id}>
                    {cat.title}({cat.count})
                  </NavItem>
                </Link>
              )
            })
          )}
        </Sidebar>
      ) : (
        <SelectSection>
          {isCategoryLoading ? (
            <CategorySkeletonUi /> // 모바일 화면에서도 카테고리 데이터를 불러오는 동안 Skeleton UI 적용
          ) : (
            <Select
              onChange={e => {
                if (e.target.value === '0') {
                  navigate(`/community`)
                  return
                }
                navigate(`/community?tab=${e.target.value}`)
              }}
            >
              {categories.map(category => {
                return (
                  <option value={category.id}>
                    {category.title}
                    {`(${category.count})`}
                  </option>
                )
              })}
            </Select>
          )}
        </SelectSection>
      )}
      <MainContent>
        <MainContentHeader>
          <HeaderLeft>
            <InputWrapper onSubmit={onInputValueSubmit}>
              <SearchIcon>
                <IoSearch />
              </SearchIcon>
              <Input
                placeholder="궁금한 키워드 입력"
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                }}
              />
            </InputWrapper>
          </HeaderLeft>
          <HeaderRight>
            <SortButton />
            <PostButton onClick={openModal}>글쓰기</PostButton>{' '}
            {/* 모달 열기 */}
          </HeaderRight>
        </MainContentHeader>
        <Feed>
          <PostListCon searchKeyword={searchKeyword} tab={tab} />
        </Feed>
      </MainContent>
      <RightSidebar>
        <WidgetWrapper>
          <WidgetTitleWrapper>
            <TitleImage src={aside_image2} alt="aside image1" />
            <WidgetTitle>실시간 인기 키워드</WidgetTitle>
          </WidgetTitleWrapper>
          <WidgetBack>
            <Widget>
              <RealTimeKeywords
                setInputValue={setInputValue}
                setSearchKeyword={setSearchKeyword}
              />
            </Widget>
          </WidgetBack>
        </WidgetWrapper>
        <WidgetWrapper>
          <WidgetTitleWrapper>
            <TitleImage src={aside_image} alt="aside image2" />
            <WidgetTitle>이웃 추천</WidgetTitle>
          </WidgetTitleWrapper>
          <WidgetBack>
            <Widget>
              <FollowRecommends />
            </Widget>
          </WidgetBack>
        </WidgetWrapper>
      </RightSidebar>
      {/* 글쓰기 모달 */}
      {isModalOpen && <PostModal onClose={closeModal} />} {/* 모달 컴포넌트 */}
    </CommunityCon>
  )
}

const CommunityCon = styled.div`
  display: flex;
  width: 100%;
  margin-top: 100px;
  overflow: visible;
  border-top: 1px solid rgba(210, 210, 210, 1);

  background-color: #fff;

  @media (max-width: 1024px) {
    margin-top: 90px;
  }

  @media (max-width: 768px) {
    margin-top: 74px;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    margin-top: 52px;
    flex-direction: column;
  }
`

// 왼쪽 사이드바
const Sidebar = styled.div`
  position: sticky;
  top: 0px;
  width: 200px;
  padding: 30px;
  background-color: #ffffff;
  border-right: 1px solid #e1e1e1;
  height: 100vh;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e1e1e1;
  }
`

const SelectSection = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 20px 0 20px;
  background-color: #f4f4f4;

  &::after {
    content: '';
    position: absolute;
    top: 58%;
    right: 34px;
    transform: translateY(-50%);
    transform: rotate(-45deg);
    width: 7px;
    height: 7px;
    border-bottom: 2.5px solid rgba(40, 40, 40, 1);
    border-left: 2.5px solid rgba(40, 40, 40, 1);
    pointer-events: none;
  }

  @media (max-width: 600px) {
    padding: 30px 20px 0 20px;

    &::after {
      top: 64%;
      right: 36px;
    }
  }
`

const Select = styled.select`
  width: 100%;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
  appearance: none;

  &:focus {
    outline: none;
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
  background-color: #f4f4f4;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 14px 20px 20px 20px;
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

const InputWrapper = styled.form`
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
  width: 100%;
  height: 100%;
`

// 오른쪽 사이드바
const RightSidebar = styled.div`
  position: sticky;
  top: 0px;
  width: 350px;
  padding: 30px 22px;
  background-color: #ffffff;
  border-left: 1px solid #e1e1e1;
  height: 100vh;

  @media (max-width: 1024px) {
    display: none;
  }
`

const WidgetWrapper = styled.div`
  margin-bottom: 40px;
`

const WidgetTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 6px;
`

const TitleImage = styled.img`
  width: 18px;
  height: 18px;
`

const WidgetBack = styled.div`
  background-color: #f4f4f4;
  padding: 17px;
  border-radius: 6px;
`

const WidgetTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 9px;
`

const Widget = styled.div``
