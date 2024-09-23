import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IoMdHeart } from 'react-icons/io'
import { FaCommentDots } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation' // navigation 관련 스타일 추가
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { Pagination, Navigation } from 'swiper/modules' // Pagination과 Navigation 모듈 추가
import { PostType } from '../../types/PostType'
import { insertComment } from '../../config/api/post/insertComment'
import { useAuth } from '../../hooks/useAuth'
import Comment from './Comment'
import { fetchUserInfoByUserId } from '../../config/api/user/fetchUserInfo'
import loadingSVG from '../../assets/images/logo/ball-triangle.svg'

// dayjs 상대 시간 플러그인과 한국어 설정
dayjs.extend(relativeTime)
dayjs.locale('ko')

// 게시물 상세 데이터를 받는 props 인터페이스
interface PostDetailProps {
  userInfo: {
    userId: string
    email: string
    avatar_url: string
    nickname: string
  }
  post: PostType
}

export default function PostDetail({ userInfo, post }: PostDetailProps) {
  const [newComment, setNewComment] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)
  const [commentsWithUserInfo, setCommentsWithUserInfo] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { session } = useAuth()

  // 댓글의 유저 정보를 불러오는 로직
  useEffect(() => {
    const loadCommentsWithUserInfo = async () => {
      if (!post.comments || post.comments.length === 0) {
        // 댓글이 없을 경우 로딩 해제
        setIsLoading(false)
        return
      }

      const loadedComments = await Promise.all(
        post!.comments!.map(async comment => {
          const userInfo = await fetchUserInfoByUserId(comment.id)
          return {
            ...comment,
            profileUrl: userInfo?.avatar_url,
            username: userInfo?.nickname,
            email: userInfo?.email,
          }
        })
      )
      setCommentsWithUserInfo(loadedComments)
      setIsLoading(false) // 모든 댓글의 유저 정보가 로드되면 로딩 해제
    }

    if (post.comments) {
      loadCommentsWithUserInfo()
    }
  }, [post.comments])

  useEffect(() => {
    if (textRef.current) {
      setShowMoreButton(
        textRef.current.scrollHeight > textRef.current.clientHeight
      )
    }
  }, [post.content])

  const OnInputSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (!newComment.trim()) return

    await insertComment({
      postId: post.id,
      userId: session!.user.id,
      comment: newComment,
    })
  }

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <img src={loadingSVG} alt="loading" />
      </LoadingContainer>
    )
  }

  return (
    <Container>
      <DetailContainer>
        <AuthorInfo>
          <ProfileImage
            src={
              userInfo.avatar_url
                ? userInfo.avatar_url
                : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
            }
            alt="Author"
          />
          <AuthorName>{userInfo.email.split('@')[0]}</AuthorName>
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
              navigation // navigation 활성화
              modules={[Pagination, Navigation]} // Pagination과 Navigation 모듈 추가
            >
              {post.img_urls.map((imgUrl, index) => (
                <SwiperSlide key={index}>
                  <SlideImage src={imgUrl} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperContainer>
        </ContentWrapper>
      </DetailContainer>

      <CommentSection>
        <CommentInputSection onSubmit={OnInputSubmit}>
          <CommentInput
            type="text"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <CommentButton type="submit">작성</CommentButton>
        </CommentInputSection>

        <CommentsSection>
          {commentsWithUserInfo.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </CommentsSection>

        <PostInteractions>
          <Likes>
            <IoMdHeart /> <span>{post.liked ? post.liked.length : 0}</span>
          </Likes>
          <Comments>
            <FaCommentDots />{' '}
            <span>{post.comments ? post.comments.length : 0}</span>
          </Comments>
        </PostInteractions>
      </CommentSection>
    </Container>
  )
}

// 스타일 컴포넌트들

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const DetailContainer = styled.div`
  max-width: 620px;
  margin: 0;
  margin-right: 20px;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
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

const ContentWrapper = styled.div`
  height: 702px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`

const Content = styled.div``

const TextContainer = styled.div`
  position: relative;
  display: inline-block;
`

interface TextProps {
  isExpanded: boolean
}

const Text = styled.span<TextProps>`
  display: block;
  line-height: 1.7;
  max-height: ${props => (props.isExpanded ? 'none' : '3.4em')};
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => (props.isExpanded ? 'none' : 2)};
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-word;
`

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
`

const SwiperContainer = styled.div`
  margin-top: 16px;

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

  /* Navigation 버튼 스타일 */
  .swiper-button-prev,
  .swiper-button-next {
    color: rgba(0, 0, 0, 0.2);
    transition: color 0.3s ease;
    font-size: 18px;
  }

  .swiper-button-prev {
    margin-left: 14px;
  }

  .swiper-button-next {
    margin-right: 14px;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: rgba(0, 0, 0, 1);
  }
`

const SlideImage = styled.img`
  width: 100%;
  height: 620px;
  object-fit: cover;
  border-radius: 10px;
`

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 450px;
  padding: 20px;
  background-color: #f8f9fa;
  border-left: 1px solid #e1e8ed;
`

const CommentInputSection = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

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
`

const CommentsSection = styled.div`
  margin-top: 22px;
  width: 100%;
  height: 596px;
  border-top: 1px solid #e1e8ed;
  border-bottom: 1px solid #e1e8ed;
  padding-top: 20px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`

const PostInteractions = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 18px 0 0px;

  span {
    font-size: 1.2rem;
  }
`

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  cursor: pointer;

  svg {
    margin-top: 1px;
    margin-right: 6px;
    color: rgba(190, 190, 190, 1);
  }
`

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
`
