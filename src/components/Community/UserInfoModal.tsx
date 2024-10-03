import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import { useInfiniteQuery } from 'react-query'
import { fetchUserPostsPerPage } from '../../config/api/post/fecthPosts'
import { FetchPostsResponse } from './PostListCon'
import { useInView } from 'react-intersection-observer'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'
import { UserRecommendCard } from './UserRecommendCard'
import { useLocation, useNavigate } from 'react-router-dom'

type recommendType = {
  id: string
  email: string
  avatar_url: string
  nickname: string
  status_message: string
}

export default function UserInfoModal({
  user,
  onClose,
}: {
  user: recommendType | null
  onClose: () => void
}) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const subTab = queryParams.get('subTab')
  const navigate = useNavigate()

  // 모달이 열릴 때 body 스크롤을 막고, 모달이 닫힐 때 스크롤을 다시 허용
  // 내 활동 (내가 올린 게시물) 데이터 패칭
  const {
    data: myPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: myPostLoading,
  } = useInfiniteQuery<FetchPostsResponse>(
    ['posts', user!.id],
    ({ pageParam = 0 }) => fetchUserPostsPerPage(pageParam, 9, user!.id),
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      staleTime: 0,
      cacheTime: 0,
      enabled: !!user,
    }
  )

  const { ref, inView } = useInView({
    threshold: 1,
    initialInView: true,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!user) return null

  if (myPostLoading) {
    return (
      <LoadingPage>
        <LoadingIcon>
          <img src={loadingIcon} alt="loadingIcon" />
        </LoadingIcon>
      </LoadingPage>
    )
  }

  // Modal을 Portal을 통해 body 바로 아래에 렌더링
  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
        <Header>
          <UserInfo>
            <ProfileImage
              src={user.avatar_url}
              alt={user.nickname || user.email}
            />
            <HeaderText>
              <UserName>{user.nickname || user.email.split('@')[0]}</UserName>
              <UserStatus>{user.status_message}</UserStatus>
            </HeaderText>
          </UserInfo>

          <TabWrapper>
            <Tab selected={subTab === null} onClick={() => {}}>
              게시물
            </Tab>
            <Tab selected={subTab === '1'} onClick={() => {}}>
              팔로워
            </Tab>
            <Tab selected={subTab === '1'} onClick={() => {}}>
              팔로잉
            </Tab>
          </TabWrapper>
        </Header>
        <Body>
          <section>
            {myPosts && myPosts.pages[0].posts.length > 0 ? (
              myPosts.pages.flatMap((page, pageIndex) =>
                page.posts.map((post, index) => (
                  <UserRecommendCard
                    key={`${pageIndex}-${index}`}
                    post={post}
                  />
                ))
              )
            ) : (
              <Empty>
                <p>등록한 게시물이 없습니다.</p>
              </Empty>
            )}
            {/* 무한 스크롤 감지를 위한 div */}
            {hasNextPage && !isFetchingNextPage && <Observer ref={ref} />}
          </section>
        </Body>
      </ModalContent>
    </ModalOverlay>,
    document.body // body 바로 아래에 렌더링
  )
}

// 스타일링
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999; // 가장 위에 표시될 수 있도록 설정
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;

  svg {
    font-size: 1.5rem;
  }
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: rgba(30, 30, 30, 1);
`

const UserStatus = styled.p`
  font-size: 0.9rem;
  color: #555;
  text-align: center;
`

const Header = styled.div`
  width: 100%;
`

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: start;
`

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 12px;
`

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  gap: 5px;
`

interface TabProps {
  selected: boolean
}

const Tab = styled.div<TabProps>`
  padding: 30px 0px 16px;
  font-size: 0.95rem;
  cursor: pointer;
  border-bottom: ${props =>
    props.selected ? '2px solid rgba(0,0,0,1)' : 'none'};
  font-weight: ${props => (props.selected ? '700' : '400')};
  margin-left: 15px;

  &:hover {
    border-bottom: 2px solid black;
  }
`

const Body = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 520px;
  justify-content: center;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  section {
    width: 100%;
    height: 520px;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  @media (max-width: 1150px) {
  }
`

const Empty = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 400px) {
    p {
      font-size: 0.9rem;
    }
  }
`

const LoadingPage = styled.div`
  margin-top: 100px;
  width: 100%;
  min-height: 500px;
  height: calc(100vh - 600px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    margin-top: 70px;
  }

  @media (max-width: 768px) {
    margin-top: 90px;
  }
`

const LoadingIcon = styled.div`
  width: 140px;
  height: 140px;
  margin-bottom: 100px;

  img {
    width: 100%;
  }

  @media (max-width: 1024px) {
    width: 130px;
    height: 130px;
  }

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`

const Observer = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid rgba(0, 0, 0, 0);
`
