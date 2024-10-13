import styled from 'styled-components'
import PostCard from './PostCard'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'
import { fetchPostsPerPage } from '../../config/api/post/fecthPosts'
import { useInfiniteQuery, useQuery } from 'react-query'
import { PostType } from '../../types/PostType'
import { useInView } from 'react-intersection-observer'
import { useEffect, useMemo, useState } from 'react'
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
  const [loadedImageCount, setLoadedImageCount] = useState(0) // 로드된 이미지 수 추적
  const [allImagesLoaded, setAllImagesLoaded] = useState(false) // 모든 이미지 로드 상태

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

  const totalImageCount = useMemo(() => {
    if (!paginatedData) return 0
    return paginatedData.pages.flatMap(page => page.posts).length
  }, [paginatedData])

  useEffect(() => {
    if (loadedImageCount === totalImageCount && totalImageCount > 0) {
      setAllImagesLoaded(true)
    }
  }, [loadedImageCount, totalImageCount])

  const handleImageLoad = () => {
    setLoadedImageCount(prevCount => prevCount + 1)
  }

  const sortedPosts = useMemo(() => {
    let allPosts: PostType[] = []

    if (paginatedData) {
      allPosts = paginatedData.pages.flatMap(page => page.posts)
    }

    if (sortValue === '인기순') {
      return allPosts.sort(
        (a, b) => (b.liked?.length || 0) - (a.liked?.length || 0)
      )
    } else {
      return allPosts
    }
  }, [paginatedData, sortValue])

  return (
    <ListCon>
      {(isUserInfoLoading || isLoading || !allImagesLoaded) && (
        <LoadingScreen>
          <img src={loadingIcon} alt="loading" />
        </LoadingScreen>
      )}
      <ListWrapper style={{ opacity: allImagesLoaded ? 1 : 0.5 }}>
        {sortedPosts.length === 0 ? (
          <Empty>게시물이 없습니다.</Empty>
        ) : (
          <>
            {sortedPosts.map(post => {
              const userInfo = userInfoData?.find(user => user.id === post.user)

              return (
                <PostCard
                  key={post.id}
                  post={post}
                  userInfo={userInfo}
                  onImageLoad={handleImageLoad} // 이미지 로드 콜백 전달
                />
              )
            })}
            {hasNextPage && <div ref={ref} />}
          </>
        )}
      </ListWrapper>
    </ListCon>
  )
}

const LoadingScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 160px);
  background-color: #f4f4f4;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
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
  min-height: calc(100vh - 202px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }
  @media (max-width: 768px) {
    min-height: calc(100vh - 230px);
    font-size: 1.3rem;
  }
  @media (max-width: 600px) {
    min-height: calc(100vh - 270px);
    font-size: 1.2rem;
  }
`
