import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IoMdHeart } from 'react-icons/io'
import { FaCommentDots } from 'react-icons/fa'
import PostDetailModal from './PostDetailModal'
import { PostType } from '../../types/PostType'
import { fetchUserInfoByUserId } from '../../config/api/user/fetchUserInfo'

interface PostCardProps {
  post: PostType
}

export default function PostCard({ post }: PostCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [userInfo, setUserInfo] = useState({
    userId: '',
    email: '',
    avatar_url: '',
  })

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchUserInfoByUserId(post.user)
      setUserInfo({
        userId: post.user,
        email: result?.email,
        avatar_url: result?.avatar_url,
      })
    }
    getUserInfo()
  }, [])

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  if (!userInfo.email) return

  return (
    <>
      {isModalOpen && (
        <PostDetailModal
          userInfo={userInfo}
          post={post}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Card onClick={handleCardClick}>
        <ImgBox>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={post.img_urls[0]}
              alt="post image"
              draggable="false"
              onLoad={() => setIsImageLoaded(true)}
              style={{ display: isImageLoaded ? 'block' : 'none' }}
            />
          </motion.div>
        </ImgBox>
        {isImageLoaded && (
          <TextBox>
            <TextHeader>
              <PostCategory>[{post.category}]</PostCategory>
              <Title>{post.title}</Title>
            </TextHeader>
            <PostText>
              <TextLeft>
                <Profile>
                  <ProfileImg
                    src={
                      userInfo.avatar_url
                        ? userInfo.avatar_url
                        : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
                    }
                  />
                  <Username>{userInfo.email.split('@')[0]}</Username>
                </Profile>
              </TextLeft>
              <TextRight>
                <HeartIcon>
                  <IoMdHeart />
                  <span>{post.liked ? post.liked.length : 0}</span>
                </HeartIcon>
                <CommentIcon>
                  <FaCommentDots />
                  <span>{post.comments ? post.comments.length : 0}</span>
                </CommentIcon>
              </TextRight>
            </PostText>
          </TextBox>
        )}
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
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
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
  margin-top: 10px;

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
  font-size: 1 rem;
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

const HeartIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  cursor: pointer;

  svg {
    font-size: 1.25rem;
    color: rgba(190, 190, 190, 1);
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

  @media (max-width: 450px) {
    margin-left: 8px;
  }

  @media (max-width: 375px) {
    margin-left: 6px;
  }
`
