import styled from "styled-components";
import PostCard from "./PostCard";
import loadingIcon from "../../assets/images/logo/ball-triangle.svg";
import { fetchAllPosts } from "../../config/api/post/fecthPosts";
import { useQuery } from "react-query";
import { PostType } from "../../types/PostType";

export default function PostListCon() {
  const { data, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts"], // Query Key
    queryFn: fetchAllPosts, // 데이터 fetch 함수
  });

  if (isLoading) {
    return (
      <LoadingScreen>
        <img src={loadingIcon} alt="loading" />
      </LoadingScreen>
    );
  }

  return (
    <>
      <ListCon>
        <ListWrapper>
          {data?.length === 0 ? (
            <Empty>게시물이 없습니다.</Empty>
          ) : (
            data?.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })
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
