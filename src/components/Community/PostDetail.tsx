import { useState } from "react";
import styled from "styled-components";
import { IoMdHeart } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

// dayjs 상대 시간 플러그인과 한국어 설정
dayjs.extend(relativeTime);
dayjs.locale("ko");

SwiperCore.use([Navigation, Pagination]);

// 게시물 상세 데이터를 받는 props 인터페이스
interface PostDetailProps {
  post: {
    id: string;
    author: string;
    authorProfileImage: string;
    content: string;
    images: string[];
    likes: number;
    comments: { id: number; user: string; text: string; timestamp: string }[];
  };
}

export default function PostDetail({ post }: PostDetailProps) {
  const [comments, setComments] = useState(post.comments); // 댓글 상태 관리
  const [newComment, setNewComment] = useState(""); // 새 댓글 입력 상태

  const currentUser = "currentUser"; // 현재 사용자를 currentUser로 설정

  // 댓글 추가 함수
  const handleAddComment = () => {
    if (newComment.trim() === "") return; // 빈 댓글은 추가하지 않음

    const newTimestamp = dayjs().toISOString(); // 새 댓글의 타임스탬프
    const updatedComments = [
      {
        id: comments.length + 1,
        user: currentUser,
        text: newComment,
        timestamp: newTimestamp,
      },
      ...comments, // 새로운 댓글을 최신 순으로 추가
    ];
    setComments(updatedComments); // 새로운 댓글을 상태에 추가
    setNewComment(""); // 입력 필드를 초기화
  };

  return (
    <Container>
      <DetailContainer>
        <AuthorInfo>
          <ProfileImage src={post.authorProfileImage} alt="Author" />
          <AuthorName>{post.author}</AuthorName>
        </AuthorInfo>

        {/* 게시물 내용 */}
        <Content>{post.content}</Content>

        {/* 이미지 */}
        <SwiperContainer>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {post.images.map((image, index) => (
              <SwiperSlide key={index}>
                <SlideImage src={image} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>

        {/* 좋아요 및 댓글 */}
        <PostInteractions>
          <Likes>
            <IoMdHeart /> <span>{post.likes}</span>
          </Likes>
          <Comments>
            <FaCommentDots /> <span>{comments.length}</span>
          </Comments>
        </PostInteractions>
      </DetailContainer>

      {/* 댓글 입력 및 댓글 리스트 섹션 (우측에 위치) */}
      <CommentSection>
        <CommentInputSection>
          <CommentInput
            type="text"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <CommentButton onClick={handleAddComment}>작성</CommentButton>
        </CommentInputSection>

        {/* 댓글 섹션 */}
        <CommentsSection>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <CommentLeft>
                <CommentUser>{comment.user}</CommentUser>
                <CommentText>{comment.text}</CommentText>
              </CommentLeft>
              <CommentTime>{dayjs(comment.timestamp).fromNow()}</CommentTime>
            </Comment>
          ))}
        </CommentsSection>
      </CommentSection>
    </Container>
  );
}

// 스타일 컴포넌트들
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailContainer = styled.div`
  max-width: 620px;
  margin: 0;
  margin-right: 20px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorName = styled.div`
  font-weight: bold;
  font-size: 1.05rem;
`;

const Content = styled.div`
  font-size: 1.05rem;
  line-height: 30px;
`;

const PostInteractions = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 12px 0 2px;

  span {
    font-size: 1rem;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  cursor: pointer;

  svg {
    margin-top: 1px;
    margin-right: 6px;
    color: red;
  }
`;

const Comments = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-left: 28px;
  svg {
    margin-top: 1px;
    margin-right: 6px;
    color: rgba(50, 50, 50, 1);
  }
`;

const SwiperContainer = styled.div`
  margin-top: 20px;

  .swiper-pagination {
    margin-bottom: 6px;
  }

  .swiper-pagination-bullet {
    background-color: rgba(150, 150, 150, 1);
    width: 8px;
    height: 8px;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: rgba(30, 30, 30, 1);
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 576px;
  object-fit: cover;
  border-radius: 10px;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 450px;
  padding: 20px;
  background-color: #f8f9fa;
  border-left: 1px solid #e1e8ed;
  max-height: 710px;
`;

const CommentInputSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const CommentButton = styled.button`
  padding: 10px;
  background-color: rgba(30, 30, 30, 1);
  color: white;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  width: 80px;
  height: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentsSection = styled.div`
  margin-top: 22px;
  width: 100%;
  border-top: 1px solid #e1e8ed;
  padding-top: 20px;
`;

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 22px;
`;

const CommentLeft = styled.div``;

const CommentUser = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`;

const CommentText = styled.div`
  margin-top: 8px;
  font-size: 0.9rem;
  color: #555;
`;

const CommentTime = styled.div`
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 5px;
`;
