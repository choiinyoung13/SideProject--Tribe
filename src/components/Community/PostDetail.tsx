import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoMdHeart } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { Pagination } from "swiper/modules";

// dayjs 상대 시간 플러그인과 한국어 설정
dayjs.extend(relativeTime);
dayjs.locale("ko");

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
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const currentUser = "currentUser";

  useEffect(() => {
    if (textRef.current) {
      setShowMoreButton(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [post.content]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newTimestamp = dayjs().toISOString();
    const updatedComments = [
      {
        id: comments.length + 1,
        user: currentUser,
        text: newComment,
        timestamp: newTimestamp,
      },
      ...comments,
    ];
    setComments(updatedComments);
    setNewComment("");
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <DetailContainer>
        <AuthorInfo>
          <ProfileImage src={post.authorProfileImage} alt="Author" />
          <AuthorName>{post.author}</AuthorName>
        </AuthorInfo>

        <ContentWrapper>
          <Content>
            <TextContainer>
              <Text ref={textRef} isExpanded={isExpanded}>
                {post.content}
              </Text>
              {showMoreButton && !isExpanded && (
                <MoreButton onClick={handleExpandClick}>... 더보기</MoreButton>
              )}
            </TextContainer>
          </Content>

          <SwiperContainer>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]} // Pagination 모듈 추가
            >
              {post.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <SlideImage src={image} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperContainer>
        </ContentWrapper>
      </DetailContainer>

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

        <PostInteractions>
          <Likes>
            <IoMdHeart /> <span>{post.likes}</span>
          </Likes>
          <Comments>
            <FaCommentDots /> <span>{comments.length}</span>
          </Comments>
        </PostInteractions>
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

const ContentWrapper = styled.div`
  height: 702px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 10px;
`;

const TextContainer = styled.div`
  position: relative;
  display: inline-block;
`;

interface TextProps {
  isExpanded: boolean;
}

const Text = styled.span<TextProps>`
  display: block;
  max-height: ${(props) => (props.isExpanded ? "none" : "3.4em")};
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isExpanded ? "none" : 2)};
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-word;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 5.5px;
  bottom: 2px;
  background: #fff;
  border: none;
  color: #0059ff;
  cursor: pointer;
  padding: 0 0 0 0;
  font-weight: 400;
  font-size: 1rem;
`;

const SwiperContainer = styled.div`
  margin-top: 20px;

  .swiper-pagination {
    position: absolute;
    bottom: 24px;
    z-index: 10;
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
  height: 620px;
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
    background-color: rgba(60, 60, 60, 1);
  }
`;

const CommentsSection = styled.div`
  margin-top: 22px;
  width: 100%;
  height: 100%;
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

const PostInteractions = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 18px 0 0px;

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
