import styled from 'styled-components'
import { IoMdHeart } from 'react-icons/io'
import { FaCommentDots } from 'react-icons/fa'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

SwiperCore.use([Navigation, Pagination])

// 게시물 상세 데이터를 받는 props 인터페이스
interface PostDetailProps {
  post: {
    id: string
    author: string
    authorProfileImage: string
    content: string
    images: string[]
    likes: number
    comments: { id: number; user: string; text: string }[]
  }
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <DetailContainer>
      <AuthorInfo>
        <ProfileImage src={post.authorProfileImage} alt="Author" />
        <AuthorName>{post.author}</AuthorName>
      </AuthorInfo>

      {/* 게시물 내용 */}
      <Content>{post.content}</Content>

      {/* 이미지 */}
      {/* Swiper를 사용한 슬라이드 이미지 */}
      <SwiperContainer>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
        >
          {post.images.map((image, index) => (
            <SwiperSlide key={index}>
              <SlideImage src={image} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 내비게이션 버튼 */}
        <SwiperButtonNext className="swiper-button-next" />
        <SwiperButtonPrev className="swiper-button-prev" />
      </SwiperContainer>

      {/* 좋아요 및 댓글 */}
      <PostInteractions>
        <Likes>
          <IoMdHeart /> <span>{post.likes}</span>
        </Likes>
        <Comments>
          <FaCommentDots /> <span>{post.comments.length}</span>
        </Comments>
      </PostInteractions>

      {/* 댓글 섹션 */}
      <CommentsSection>
        {post.comments.map(comment => (
          <Comment key={comment.id}>
            <CommentUser>{comment.user}</CommentUser>
            <CommentText>{comment.text}</CommentText>
          </Comment>
        ))}
      </CommentsSection>
    </DetailContainer>
  )
}

// 스타일 컴포넌트들
const DetailContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 12px 26px;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`

const AuthorName = styled.div`
  font-weight: bold;
  font-size: 1.05rem;
`

const Content = styled.div`
  font-size: 1.05rem;
  line-height: 30px;
`

const PostInteractions = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 10px 0 18px;

  span {
    font-size: 0.95rem;
  }
`

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;

  svg {
    margin-top: 1px;
    margin-right: 5px;
    color: red;
  }
`

const Comments = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-left: 18px;
  svg {
    margin-top: 1px;
    margin-right: 5px;
    color: rgba(50, 50, 50, 1);
  }
`

const CommentsSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid #e1e8ed;
  padding-top: 10px;
`

const Comment = styled.div`
  margin-top: 20px;

  &:nth-child(1) {
    margin-top: 10px;
  }
`

const CommentUser = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`

const CommentText = styled.div`
  margin-top: 6px;
  font-size: 0.9rem;
  color: #555;
`

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
`

const SlideImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
`
// 화살표 버튼 스타일
const SwiperButtonNext = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;

  &::after {
    content: '▶';
    font-size: 12px;
    color: #000;
  }
`

const SwiperButtonPrev = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;

  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;

  &::after {
    content: '◀';
    font-size: 12px;
    color: #000;
  }
`
