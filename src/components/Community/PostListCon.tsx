import styled from "styled-components";
import PostCard from "./PostCard";
import loadingIcon from "../../assets/images/logo/ball-triangle.svg";
import { fetchPostsPerPage } from "../../config/api/post/fecthPosts";
import { useInfiniteQuery } from "react-query";
import { PostType } from "../../types/PostType";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export type FetchPostsResponse = {
  posts: PostType[];
  nextCursor: number | null;
};

export default function PostListCon() {
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
        staleTime: 0,
        cacheTime: 0,
      }
    );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <LoadingScreen>
        <img src={loadingIcon} alt="loading" />
      </LoadingScreen>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <ListCon>
        <ListWrapper>
          {data.pages.length === 0 ? (
            <Empty>게시물이 없습니다.</Empty>
          ) : (
            <>
              {data?.pages.map((page) =>
                page.posts.map((post) => {
                  return <PostCard key={post.id} post={post} />;
                })
              )}
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
  font-size: 1.7rem;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
