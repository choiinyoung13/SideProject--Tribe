import styled from 'styled-components'
import PostCard from './PostCard'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'
import { fetchPostsPerPage } from '../../config/api/post/fecthPosts'
import { useInfiniteQuery } from 'react-query'
import { PostType } from '../../types/PostType'
import { useInView } from 'react-intersection-observer'
import { useEffect, useMemo, useState } from 'react'
import { communitySortState } from '../../recoil/atoms/SortState'
import { useRecoilValue } from 'recoil'
import { tabNumberToCommunityCategory } from '../../utill/tabNumberToCategory'

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

  // 상태 추가: 이미지 로딩 완료 여부
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [imageLoadCount, setImageLoadCount] = useState(0)

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

  // 모든 이미지가 로드되었는지 확인하는 로직
  useEffect(() => {
    if (imageLoadCount === sortedPosts.length) {
      setImagesLoaded(true)
    }
  }, [imageLoadCount, sortedPosts.length])

  const handleImageLoad = () => {
    setImageLoadCount(prevCount => prevCount + 1)
  }

  if (isLoading || !imagesLoaded) {
    return (
      <LoadingScreen>
        <img src={loadingIcon} alt="loading" />
      </LoadingScreen>
    )
  }

  if (!paginatedData || !sortedPosts) {
    return null
  }

  return (
    <>
      {imagesLoaded ? (
        <ListCon>
          <ListWrapper>
            {sortedPosts.length === 0 ? (
              <Empty>게시물이 없습니다.</Empty>
            ) : (
              <>
                {sortedPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onImageLoad={handleImageLoad} // 이미지 로드 핸들러 전달
                  />
                ))}
                {hasNextPage && <div ref={ref} />}
              </>
            )}
          </ListWrapper>
        </ListCon>
      ) : (
        <LoadingScreen>
          <img src={loadingIcon} alt="loading" />
        </LoadingScreen>
      )}
    </>
  )
}

const LoadingScreen = styled.div`
  width: 100%;
  height: 75vh;
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
    img {
      width: 80px;
    }
  }
`

const ListCon = styled.div`
  width: 100%;
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
  height: calc(100vh - 220px);
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
