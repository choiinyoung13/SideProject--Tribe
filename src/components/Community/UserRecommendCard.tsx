import styled from 'styled-components'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { IoMdHeart } from 'react-icons/io'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PostType } from '../../types/PostType'
import { useQuery } from 'react-query'
import { fetchUserInfoByUserId } from '../../config/api/user/fetchUserInfo'
import PostDetailModal from './PostDetailModal'

interface UserRecommendCardProps {
  post?: PostType
}

export const UserRecommendCard = ({ post }: UserRecommendCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: userInfo } = useQuery(
    ['userInfo'],
    () => fetchUserInfoByUserId(post!.user),
    {
      enabled: !!post,
    }
  )

  // 모달 열기 함수
  const handleCardClick = () => {
    if (post) {
      setIsModalOpen(true)
    }
  }

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  if (post) {
    return (
      <>
        {isModalOpen && post && userInfo && (
          <PostDetailModal // 모달 컴포넌트
            userInfo={userInfo}
            post={post}
            onClose={handleCloseModal}
          />
        )}

        <CardWrapper onClick={handleCardClick}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <CardImage>
              <img
                src={post.img_urls[0]}
                alt={post.title}
                onLoad={() => {
                  setIsImageLoaded(true)
                }}
              />
            </CardImage>
            <CardContent>
              <h3>
                <Category>[{post.category}]</Category>
                {post.title}
              </h3>
              <p>{post.content}</p>
              <PostInfo>
                <Liked>
                  <IoMdHeart />
                  <span>{!post.liked ? 0 : post.liked.length}개</span>
                </Liked>
                <Comment>
                  <IoChatbubbleEllipsesOutline />
                  <span>{!post.comments ? 0 : post.comments.length}개</span>
                </Comment>
              </PostInfo>
            </CardContent>
          </motion.div>
        </CardWrapper>
      </>
    )
  }

  return null
}

const CardWrapper = styled.div`
  position: relative;
  width: calc(33.33% - 10px);

  background-color: #f8f9fa;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  text-align: left;
  color: #333;
  box-sizing: border-box;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(50, 50, 50, 1);
  }

  p {
    margin: 11px 0;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    width: calc(50% - 7.5px);

    h3 {
      font-size: 0.7rem;
    }

    p {
      font-size: 0.65rem;
    }
  }
`

const CardImage = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 유지 */
  position: relative;
  margin-bottom: 10px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 600px) {
    h3 {
      font-size: 0.8rem;
    }
  }
`

const Category = styled.span`
  font-weight: 400;
  font-size: 0.8rem;
  color: rgba(100, 100, 100, 1);
  margin-right: 4px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }

  @media (max-width: 375px) {
    font-size: 0.65rem;
  }
`

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: #888;

  span {
    display: block;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }

  @media (max-width: 375px) {
    font-size: 0.65rem;
  }
`

const Liked = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  svg {
    color: rgb(253, 70, 108);
    font-size: 0.9rem;
    margin-top: 5px;
    margin-right: 3px;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 600px) {
    svg {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 375px) {
    svg {
      font-size: 0.7rem;
    }
  }
`

const Comment = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: rgb(30, 30, 30);
    font-size: 0.9rem;
    margin-top: 5px;
    margin-right: 3px;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 600px) {
    svg {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 375px) {
    svg {
      font-size: 0.7rem;
    }
  }
`
