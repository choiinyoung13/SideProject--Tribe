import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IoMdHeart } from 'react-icons/io'
import { IoChatbubbleEllipsesOutline, IoCloseSharp } from 'react-icons/io5'
import { GoTrash } from 'react-icons/go'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { Pagination, Navigation } from 'swiper/modules'
import { PostType } from '../../types/PostType'
import { insertComment } from '../../config/api/post/insertComment'
import { useAuth } from '../../hooks/useAuth'
import Comment from './Comment'
import { fetchUserInfoByUserId } from '../../config/api/user/fetchUserInfo'
import loadingSVG from '../../assets/images/logo/ball-triangle.svg'
import { useMutation, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'
import Spinner from '../Common/Spinner'
import { useNavigate } from 'react-router-dom'
import { insertUserIdIntoLiked } from '../../config/api/post/insertPost'
import { deletePost } from '../../config/api/post/deletePost'
import useWindowWidth from '../../hooks/useWindowWidth'
import LazyLoadedSlideImage from './LazyLoadedSlideImage'

// dayjs 상대 시간 플러그인과 한국어 설정
dayjs.extend(relativeTime)
dayjs.locale('ko')

interface PostDetailProps {
  userInfo: {
    userId: string
    email: string
    avatar_url: string
    nickname: string
  }
  post: PostType
  onClose: () => void
}

interface CommentProps {
  id: string
  user: string
  text: string
  timestamp: string
  profileUrl?: string
  username?: string
  email?: string
}

export default function PostDetail({
  userInfo,
  post,
  onClose,
}: PostDetailProps) {
  const [newComment, setNewComment] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const [commentsWithUserInfo, setCommentsWithUserInfo] = useState<
    CommentProps[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isSingleLine, setIsSingleLine] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const navigate = useNavigate()
  const windowWidth = useWindowWidth()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const { mutate: commentMutate, isLoading: insertCommentLoading } =
    useMutation(insertComment, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
        setCommentsWithUserInfo([])
      },
      onError: () => {
        Swal.fire({
          text: '게시글 저장 중 오류가 발생했습니다.',
          icon: 'error',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
      },
    })

  const { mutate: likeMutate } = useMutation(insertUserIdIntoLiked, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
    },
    onError: () => {
      Swal.fire({
        text: '좋아요 업데이트를 실패했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    },
  })

  useEffect(() => {
    if (textRef.current) {
      const clientHeight = textRef.current.clientHeight // 요소가 실제로 보이는 높이
      const scrollHeight = textRef.current.scrollHeight // 스크롤할 때 포함되는 전체 높이 (즉, 숨겨진 부분까지 포함)

      // 텍스트가 잘렸는지 확인하고 "더보기" 버튼 활성화
      setShowMoreButton(scrollHeight > clientHeight)
      setIsSingleLine(scrollHeight === clientHeight)
    }
  }, [post.content, textRef.current])

  useEffect(() => {
    const loadCommentsWithUserInfo = async () => {
      if (!post.comments || post.comments.length === 0) {
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
      setIsLoading(false)
    }

    loadCommentsWithUserInfo()
  }, [post.comments])

  const OnInputSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (!session) {
      Swal.fire({
        text: '로그인 후 사용 가능한 기능입니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1E1E1E',
        cancelButtonColor: '#1E1E1E',
        confirmButtonText: '로그인',
        cancelButtonText: '닫기',
        scrollbarPadding: false,
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
      return
    }

    if (!newComment.trim()) return

    await commentMutate({
      postId: post.id,
      userId: session!.user.id,
      comment: newComment,
    })

    setNewComment('')
  }

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleDeleteClick = () => {
    Swal.fire({
      html: `
        <h1 style="font-weight:500; font-size:20px;">정말 게시물을 삭제하시겠습니까?</h1>
      `,
      confirmButtonText: '삭제',
      showCancelButton: true,
      cancelButtonText: '취소',
      allowOutsideClick: false,
      confirmButtonColor: '#1E1E1E',
      cancelButtonColor: '#1E1E1E',
    }).then(result => {
      if (result.isConfirmed) {
        deletePost(post.id).then(async () => {
          await queryClient.invalidateQueries('posts')
          onClose()
        })
      }
    })
  }

  // 슬라이드 변경 이벤트 핸들러
  const handleSlideChange = (swiper: {
    activeIndex: React.SetStateAction<number>
  }) => {
    setCurrentSlideIndex(swiper.activeIndex)
  }

  // 다음 슬라이드 이미지 URL 가져오기
  const preloadNextImageSrc =
    currentSlideIndex + 1 < post.img_urls.length
      ? post.img_urls[currentSlideIndex + 1]
      : undefined // 마지막 슬라이드일 경우 undefined

  if (isLoading && !isImageLoading) {
    return (
      <LoadingContainer>
        <img src={loadingSVG} alt="loading" />
      </LoadingContainer>
    )
  }

  return (
    <Container>
      <DetailContainer isSingleLine={isSingleLine}>
        <AuthorInfo>
          <div>
            <ProfileImage
              src={
                userInfo.avatar_url
                  ? userInfo.avatar_url
                  : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
              }
              alt="Author"
            />
            <AuthorName>
              {userInfo.nickname
                ? userInfo.nickname
                : userInfo.email.split('@')[0]}
            </AuthorName>
          </div>
          {windowWidth <= 700 && (
            <SmallCloseIcon onClick={onClose}>
              <IoCloseSharp />
            </SmallCloseIcon>
          )}
        </AuthorInfo>

        <ContentWrapper>
          <Content>
            <TextContainer>
              <Text ref={textRef} isExpanded={isExpanded}>
                {post.content}
              </Text>
              {showMoreButton && !isExpanded && (
                <MoreButton onClick={handleExpandClick}>+더보기</MoreButton>
              )}
            </TextContainer>
          </Content>

          {/* 이미지 슬라이드 섹션 */}
          <SwiperContainer>
            <Swiper
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              modules={[Pagination, Navigation]}
              onSlideChange={handleSlideChange} // 슬라이드 변경 시 인덱스 업데이트
            >
              {post.img_urls.map((imgUrl, index) => (
                <SwiperSlide key={index}>
                  <LazyLoadedSlideImage
                    src={imgUrl}
                    alt={`Slide ${index + 1}`}
                    setIsImageLoading={setIsImageLoading}
                    preloadNextImageSrc={preloadNextImageSrc}
                  />
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
          <CommentButton type="submit" disabled={insertCommentLoading}>
            {insertCommentLoading ? <Spinner width={16} height={16} /> : '작성'}
          </CommentButton>
        </CommentInputSection>

        <CommentsSection isSingleLine={isSingleLine}>
          {commentsWithUserInfo.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </CommentsSection>

        <PostInteractions>
          <Likes
            isLiked={
              !!(
                session?.user.id &&
                Array.isArray(post.liked) &&
                post.liked.includes(session.user.id)
              )
            }
            onClick={async () => {
              if (!session) {
                Swal.fire({
                  text: '로그인 후 사용 가능한 기능입니다.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#1E1E1E',
                  cancelButtonColor: '#1E1E1E',
                  confirmButtonText: '로그인',
                  cancelButtonText: '닫기',
                  scrollbarPadding: false,
                }).then(result => {
                  if (result.isConfirmed) {
                    navigate('/login')
                  }
                })
                return
              }

              await likeMutate({ postId: post.id, userId: session.user.id })
            }}
          >
            <IoMdHeart /> <span>{post.liked ? post.liked.length : 0}</span>
          </Likes>
          <Comments>
            <IoChatbubbleEllipsesOutline />{' '}
            <span>{post.comments ? post.comments.length : 0}</span>
          </Comments>
          {session && session.user.id === post.user && (
            <Delete onClick={handleDeleteClick}>
              <GoTrash />
            </Delete>
          )}
        </PostInteractions>
      </CommentSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-direction: column;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 757px;

  img {
    width: 120px;
    height: 120px;
  }
`

interface DetailContainerType {
  isSingleLine: boolean
}

const DetailContainer = styled.div<DetailContainerType>`
  width: 100%;
  max-width: 620px;
  margin-right: 20px;
  height: ${props => (props.isSingleLine ? '100%' : '730px')};

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    overflow-y: visible;
    max-width: 100%;
    height: 100%;
    margin-right: 0;
  }
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  div {
    display: flex;
    align-items: center;
  }
`

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;

  @media (max-width: 400px) {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
`

const AuthorName = styled.div`
  font-weight: bold;
  font-size: 1.05rem;

  @media (max-width: 600px) {
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.9rem;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
  border-radius: 10px;

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
  display: -webkit-box;
  -webkit-line-clamp: ${({ isExpanded }) =>
    isExpanded ? 'none' : 1}; /* 기본 1줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap; /* 줄바꿈과 공백을 유지 */
  line-height: 1.7;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    font-size: 0.85rem;
  }
`

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #0059ff;
  cursor: pointer;
  font-weight: 400;
  font-size: 1rem;
  padding: 0;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }

  @media (max-width: 400px) {
    font-size: 0.7rem;
  }
`

const SwiperContainer = styled.div`
  margin-top: 16px;
  border-radius: 10px;
  width: 100%;

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

  .swiper-button-prev,
  .swiper-button-next {
    color: rgba(0, 0, 0, 0.2);
    font-size: 18px;
  }

  .swiper-button-prev {
    margin-left: 14px;
  }

  .swiper-button-next {
    margin-right: 14px;
  }

  @media (max-width: 1200px) {
    .swiper-button-prev,
    .swiper-button-next {
      font-size: 16px;
    }
  }
`

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 450px;
  padding: 20px;
  background-color: #f8f9fa;
  border-left: 1px solid #e1e8ed;

  @media (max-width: 1200px) {
    width: 100%;
    border-left: none;
    background-color: #fff;
    padding: 24px 0px 0px 0px;
  }
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

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
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

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`
interface CommentsSectionType {
  isSingleLine: boolean
}

const CommentsSection = styled.div<CommentsSectionType>`
  display: flex;
  flex-direction: column;
  gap: ${props => (props.isSingleLine ? '29px' : '32px')};
  margin-top: 26px;
  width: 100%;
  height: ${props => (props.isSingleLine ? '560px' : '584px')};
  border-top: 1px solid #e1e8ed;
  border-bottom: 1px solid #e1e8ed;
  padding: 20px 0;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media (max-width: 1200px) {
    height: 100%;
    border-top: none;
    padding-top: 0px;
    gap: 27px;
    max-height: 466px;
  }
`

const PostInteractions = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 16px 0 0px;

  span {
    font-size: 1.2rem;
  }
`

interface HeartIconProps {
  isLiked: boolean
}

const Likes = styled.div<HeartIconProps>`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  cursor: pointer;

  svg {
    margin-top: 1px;
    margin-right: 6px;
    color: ${({ isLiked }) =>
      isLiked ? 'rgb(253, 70, 108)' : 'rgba(190, 190, 190, 1)'};
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${({ isLiked }) =>
      isLiked ? 'rgb(253, 70, 108)' : 'rgba(160, 160, 160, 1)'};
  }
`

const Comments = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin-left: 28px;

  svg {
    margin-top: 1px;
    margin-right: 6px;
    color: rgba(50, 50, 50, 1);
  }
`

const Delete = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin-left: 22px;

  svg {
    margin-top: 1px;
    color: rgba(65, 65, 65, 1);
  }
`

const SmallCloseIcon = styled.div`
  font-size: 1.5rem;
  color: rgba(50, 50, 50, 1);
  cursor: pointer;
`
