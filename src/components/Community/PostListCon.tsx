import styled from 'styled-components'
import PostCard from './PostCard'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'
import { fetchPostsPerPage } from '../../config/api/post/fecthPosts'
import { useInfiniteQuery, useQuery } from 'react-query'
import { PostType } from '../../types/PostType'
import { useInView } from 'react-intersection-observer'
import { useEffect, useMemo } from 'react'
import { communitySortState } from '../../recoil/atoms/SortState'
import { useRecoilValue } from 'recoil'
import { tabNumberToCommunityCategory } from '../../utill/tabNumberToCategory'
import { fetchAllUserInfo } from '../../config/api/user/fetchUserInfo'

export type FetchPostsResponse = {
  posts: PostType[]
  nextCursor: number | null
}

interface PostListConProps {
  searchKeyword: string
  tab: string | null
}

export default function PostListCon({ searchKeyword, tab }: PostListConProps) {
  const sortValue = useRecoilValue(communitySortState)

  const { inView, ref } = useInView({
    threshold: 0.5,
    initialInView: true,
  })

  const { data: userInfoData, isLoading: isUserInfoLoading } = useQuery(
    'allUsers',
    fetchAllUserInfo
  )

  const {
    data: paginatedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<FetchPostsResponse>(
    ['posts', tab, searchKeyword],
    ({ pageParam = 0 }) =>
      fetchPostsPerPage(
        pageParam,
        8,
        tabNumberToCommunityCategory(Number(tab)),
        searchKeyword
      ),
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      staleTime: 0,
      cacheTime: 0,
    }
  )

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView])

  // 데이터를 sortValue에 따라 재가공
  const sortedPosts = useMemo(() => {
    let allPosts: PostType[] = []

    if (paginatedData) {
      // paginatedData가 있는지 확인
      allPosts = paginatedData.pages.flatMap(page => page.posts)
    }

    // sortValue에 따라 정렬
    if (sortValue === '인기순') {
      return allPosts.sort(
        (a, b) => (b.liked?.length || 0) - (a.liked?.length || 0)
      )
    } else {
      return allPosts
    }
  }, [paginatedData, sortValue])

  if (isLoading || isUserInfoLoading) {
    return (
      <ListCon>
        <ListWrapper>
          <LoadingScreen>
            <img src={loadingIcon} alt="loading" />
          </LoadingScreen>
        </ListWrapper>
      </ListCon>
    )
  }

  return (
    <>
      <ListCon>
        <ListWrapper>
          {sortedPosts.length === 0 ? (
            <Empty>게시물이 없습니다.</Empty>
          ) : (
            <>
              {sortedPosts.map(post => {
                // post.user와 일치하는 사용자 정보를 배열에서 찾아서 전달
                const userInfo = userInfoData?.find(
                  user => user.id === post.user
                )

                return (
                  <PostCard key={post.id} post={post} userInfo={userInfo} />
                )
              })}
              {hasNextPage && <div ref={ref} />}
            </>
          )}
        </ListWrapper>
      </ListCon>
    </>
  )
}

const LoadingScreen = styled.div`
  background-color: #f4f4f4;
  z-index: 1000;
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
  }

  @media (max-width: 1024px) {
    img {
      width: 80px;
    }
  }

  @media (max-width: 768px) {
    img {
      width: 90px;
    }
  }

  @media (max-width: 600px) {
    height: calc(100vh - 250px);

    img {
      width: 80px;
    }
  }
`

const ListCon = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`

const ListWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
`

const Empty = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 100px);

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`
