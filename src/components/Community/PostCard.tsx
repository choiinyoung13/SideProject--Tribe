import styled from 'styled-components'
import { useState } from 'react'
import { IoMdHeart } from 'react-icons/io'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import PostDetailModal from './PostDetailModal'
import { PostType } from '../../types/PostType'
import { useAuth } from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { insertUserIdIntoLiked } from '../../config/api/post/insertPost'
import UserInfoModal from './UserInfoModal'
import { UserInfoType } from '../../types/UserInfoType'
import { motion } from 'framer-motion'

interface PostCardProps {
  post: PostType
  userInfo: UserInfoType
  onImageLoad: () => void
}

export default function PostCard({
  post,
  userInfo,
  onImageLoad,
}: PostCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false)
  const { session } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(insertUserIdIntoLiked, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
    },
    onError: error => {
      console.error('게시글 저장 오류:', error)
      Swal.fire({
        text: '좋아요 업데이트를 실패했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    },
  })

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleUserInfoClick = () => {
    setIsUserInfoModalOpen(true) // 프로필 클릭 시 UserInfoModal 열기
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true)
    onImageLoad()
  }

  return (
    <>
      {isUserInfoModalOpen && userInfo && (
        <UserInfoModal
          user={userInfo}
          onClose={() => setIsUserInfoModalOpen(false)} // 모달 닫기
        />
      )}
      {isModalOpen && userInfo && (
        <PostDetailModal
          userInfo={{
            userId: post.user,
            email: userInfo?.email,
            avatar_url: userInfo?.avatar_url,
            nickname: userInfo?.nickname ? userInfo.nickname : '',
          }}
          post={post}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Card>
        <ImgBox onClick={handleCardClick}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={post.img_urls[0]}
              onLoad={handleImageLoad}
              alt="post image"
              draggable="false"
            />
          </motion.div>
        </ImgBox>

        <TextBox>
          <TextHeader onClick={handleCardClick}>
            <PostCategory>[{post.category}]</PostCategory>
            <Title>{post.title}</Title>
          </TextHeader>
          <PostText>
            <TextLeft>
              <Profile>
                <ProfileImg
                  src={
                    userInfo?.avatar_url
                      ? userInfo.avatar_url
                      : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
                  }
                />

                {/* 프로필 클릭 시 모달 열림 */}
                <Username onClick={handleUserInfoClick}>
                  {userInfo ? (
                    <Username onClick={handleUserInfoClick}>
                      {userInfo.nickname
                        ? userInfo.nickname
                        : userInfo.email?.split('@')[0] ||
                          '등록된 이메일이 없습니다.'}
                    </Username>
                  ) : (
                    <p>사용자 정보를 불러오는 중...</p>
                  )}
                </Username>
              </Profile>
            </TextLeft>
            <TextRight>
              <HeartIcon
                isLiked={
                  !!(
                    session?.user.id &&
                    Array.isArray(post.liked) &&
                    post.liked.includes(session.user.id)
                  )
                }
                onClick={() => {
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
                  mutate({ postId: post.id, userId: session.user.id })
                }}
              >
                <IoMdHeart />
                <span>{Array.isArray(post.liked) ? post.liked.length : 0}</span>
              </HeartIcon>
              <CommentIcon>
                <IoChatbubbleEllipsesOutline />
                <span>
                  {Array.isArray(post.comments) ? post.comments.length : 0}
                </span>
              </CommentIcon>
            </TextRight>
          </PostText>
        </TextBox>
      </Card>
    </>
  )
}

const Card = styled.div`
  position: relative;
  width: calc(25% - 15px);

  @media (max-width: 1600px) {
    width: calc(33.33% - 13.5px);
  }

  @media (max-width: 1300px) {
    width: calc(50% - 10.5px);
  }
`

const ImgBox = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 유지 */
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const TextBox = styled.div`
  margin-top: 10px;
  padding: 8px;

  @media (max-width: 600px) {
    margin-top: 8px;
    padding: 8px 8px 8px 2px;
  }

  @media (max-width: 450px) {
    margin-top: 6px;
  }
`

const TextHeader = styled.div`
  display: flex;
`
const PostCategory = styled.div`
  flex-shrink: 0;
  margin-right: 4px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
`

const PostText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;

  @media (max-width: 768px) {
    margin-top: 8px;
  }

  @media (max-width: 450px) {
    margin-top: 4px;
  }
`

const Title = styled.div`
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
`

const Profile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-top: 4px;

  @media (max-width: 450px) {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 375px) {
    width: 18px;
    height: 18px;
  }
`

const Username = styled.div`
  font-size: 0.9rem;
  color: rgba(50, 50, 50, 1);
  margin-left: 6px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 3px;
  padding-bottom: 3px;

  @media (max-width: 1350px) {
    font-size: 0.85rem;
  }

  @media (max-width: 450px) {
    font-size: 0.8rem;
  }

  @media (max-width: 375px) {
    font-size: 0.75rem;
  }
`

const TextLeft = styled.div`
  display: flex;
  align-items: center;
`

const TextRight = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: rgba(190, 190, 190, 1);
  margin-top: 1px;

  span {
    font-size: 0.9rem;
    color: rgba(50, 50, 50, 1);
    margin-left: 4px;
    margin-bottom: 1px;
  }

  @media (max-width: 450px) {
    font-size: 0.8rem;

    span {
      font-size: 0.7rem;
      margin-left: 3px;
    }
  }

  @media (max-width: 375px) {
    span {
      display: none;
    }
  }
`

interface HeartIconProps {
  isLiked: boolean
}

const HeartIcon = styled.div<HeartIconProps>`
  display: flex;
  align-items: center;
  margin-left: 12px;
  cursor: pointer;

  svg {
    font-size: 1.25rem;
    color: ${({ isLiked }) =>
      isLiked ? 'rgb(253, 70, 108)' : 'rgba(190, 190, 190, 1)'};
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${({ isLiked }) =>
      isLiked ? 'rgb(253, 70, 108)' : 'rgba(160, 160, 160, 1)'};
  }

  @media (max-width: 450px) {
    margin-left: 8px;
  }

  @media (max-width: 375px) {
    svg {
      font-size: 1rem;
    }
  }
`

const CommentIcon = styled.div`
  color: rgba(50, 50, 50, 1);
  display: flex;
  align-items: center;
  margin-left: 12px;

  svg {
    font-size: 1.1rem;
  }

  @media (max-width: 450px) {
    margin-left: 8px;
  }

  @media (max-width: 375px) {
    margin-left: 6px;
  }
`
