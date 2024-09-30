import styled from 'styled-components'
import { Card } from './Card'
import { PostType } from '../../types/PostType'
import { useInfiniteQuery } from 'react-query'
import { fetchLikedPostsPerPage } from '../../config/api/post/fecthPosts'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'

type FetchPostsResponse = {
  posts: PostType[]
  nextCursor: number | null
}

export function LikedPostsSection() {
  // 내 활동 (좋아요 누른 게시물) 데이터 패칭
  const {
    data: likedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: likedPostLoading,
  } = useInfiniteQuery<FetchPostsResponse>(
    ['Posts', 'liked'],
    ({ pageParam = 0 }) => fetchLikedPostsPerPage(pageParam, 8),
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      staleTime: 0,
      cacheTime: 0,
    }
  )

  const { ref, inView } = useInView({
    threshold: 0.5,
    initialInView: true,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('ㅎㅇ')
      fetchNextPage()
    }
  }, [inView])

  if (likedPostLoading) {
    return (
      <LoadingPage>
        <LoadingIcon>
          <img src={loadingIcon} alt="loadingIcon" />
        </LoadingIcon>
      </LoadingPage>
    )
  }

  return (
    <Section>
      <ContentWrapper>
        <section>
          {likedPosts && likedPosts.pages.length > 0 ? (
            likedPosts.pages.flatMap((page, pageIndex) =>
              page.posts.map((post, index) => (
                <Card key={`${pageIndex}-${index}`} post={post} />
              ))
            )
          ) : (
            <Empty>
              <p>좋아요를 누른 게시물이 없습니다.</p>
            </Empty>
          )}
        </section>
        {/* 무한 스크롤 감지를 위한 div */}
        {hasNextPage && !isFetchingNextPage && <Observer ref={ref} />}
      </ContentWrapper>
    </Section>
  )
}

const Section = styled.div`
  width: 100%;
  padding: 20px 0 0;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  section {
    width: 100%;
    min-height: 565px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  @media (max-width: 1150px) {
    section {
      padding: 0 30px 0 35px;
    }
  }
`
const Empty = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
  }

  @media (max-width: 600px) {
    p {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 400px) {
    p {
      font-size: 1.1rem;
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
  height: 30px;
`
