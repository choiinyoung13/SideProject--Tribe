import styled from 'styled-components'
import { IoMdHeart } from 'react-icons/io'
import { FaCommentDots } from 'react-icons/fa'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'

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
          navigation
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
          <IoMdHeart /> {post.likes} Likes
        </Likes>
        <Comments>
          <FaCommentDots /> {post.comments.length} Comments
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
  padding: 20px;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

const AuthorName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`

const Content = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
`

const PostInteractions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  svg {
    margin-right: 5px;
    color: red;
  }
`

const Comments = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  svg {
    margin-right: 5px;
    color: #1da1f2;
  }
`

const CommentsSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid #e1e8ed;
  padding-top: 10px;
`

const Comment = styled.div`
  margin-bottom: 10px;
`

const CommentUser = styled.div`
  font-weight: bold;
`

const CommentText = styled.div`
  font-size: 1rem;
  color: #555;
`

const SwiperContainer = styled.div`
  margin-top: 20px;
`

const SlideImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`
