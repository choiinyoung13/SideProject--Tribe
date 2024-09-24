import styled from "styled-components";
import PostCard from "./PostCard";
import loadingIcon from "../../assets/images/logo/ball-triangle.svg";
import { fetchPostsPerPage } from "../../config/api/post/fecthPosts";
import { useInfiniteQuery } from "react-query";
import { PostType } from "../../types/PostType";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import { communitySortState } from "../../recoil/atoms/SortState";
import { useRecoilValue } from "recoil";

export type FetchPostsResponse = {
  posts: PostType[];
  nextCursor: number | null;
};

export default function PostListCon() {
  const sortValue = useRecoilValue(communitySortState);

  const { inView, ref } = useInView({
    threshold: 0.5,
    initialInView: true,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<FetchPostsResponse>(
      ["posts"],
      ({ pageParam = 0 }) => fetchPostsPerPage(pageParam, 8),
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
        staleTime: 10 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
      }
    );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 데이터를 sortValue에 따라 재가공
  const sortedPosts = useMemo(() => {
    if (!data) return [];

    // 모든 페이지의 게시글을 합침
    const allPosts = data.pages.flatMap((page) => page.posts);

    if (sortValue === "인기순") {
      // 인기순으로 liked 배열의 길이 기준으로 정렬
      return allPosts.sort(
        (a, b) => (b.liked?.length || 0) - (a.liked?.length || 0)
      );
    } else if (sortValue === "최신순") {
      // 기본적으로 오는 데이터들이 최신순으로 정렬되서 오기 때문에 그대로 사용
      return allPosts;
    }
  }, [data, sortValue]);

  if (isLoading) {
    return (
      <LoadingScreen>
        <img src={loadingIcon} alt="loading" />
      </LoadingScreen>
    );
  }

  if (!data || !sortedPosts) {
    return null;
  }

  return (
    <>
      <ListCon>
        <ListWrapper>
          {sortedPosts.length === 0 ? (
            <Empty>게시물이 없습니다.</Empty>
          ) : (
            <>
              {sortedPosts.map((post) => {
                return <PostCard key={post.id} post={post} />;
              })}
              {hasNextPage && <div ref={ref} />}
            </>
          )}
        </ListWrapper>
      </ListCon>
    </>
  );
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
`;

const ListCon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ListWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
`;

// const LoadingObserver = styled.div`
//   width: 100%;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

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
`;
