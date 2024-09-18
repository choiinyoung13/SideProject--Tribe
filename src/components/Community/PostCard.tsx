import styled from 'styled-components'
import { useState } from 'react'
import defaultImage from '../../assets/images/shop_item/default-image.png'
import { motion } from 'framer-motion'
import { IoMdHeart } from 'react-icons/io'
import PostDetailModal from './PostDetailModal'

interface ItemCardPropsType {
  id: number
  title: string
  imgurl: string
  userLikeData: number[]
}

export default function PostCard({ id, imgurl }: ItemCardPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {isModalOpen && <PostDetailModal onClose={() => setIsModalOpen(false)} />}
      <Card onClick={handleCardClick}>
        <ImgBox>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={imgurl ? imgurl : defaultImage}
              alt="item image"
              draggable="false"
              onLoad={() => setIsImageLoaded(true)}
              style={{ display: isImageLoaded ? 'block' : 'none' }}
            />
          </motion.div>
        </ImgBox>
        {isImageLoaded && (
          <TextBox>
            <TextHeader>
              <PostCategory>[정보]</PostCategory>
              <Title>채광 안 좋은 집에서도 키울 수 있는 식물 리스트</Title>
            </TextHeader>
            <PostText>
              <TextLeft>
                <Profile>
                  <ProfileImg src={imgurl} />
                  <Username>dlsdud156</Username>
                </Profile>
              </TextLeft>
              <TextRight>
                <IoMdHeart />
                <span>3.4k</span>
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
`

const TextHeader = styled.div`
  display: flex;
`
const PostCategory = styled.div`
  flex-shrink: 0;
  margin-right: 4px;
`

const PostText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
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
`
const Username = styled.div`
  font-size: 0.9rem;
  color: rgba(50, 50, 50, 1);
  margin-left: 6px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  cursor: pointer;

  span {
    font-size: 0.9rem;
    color: rgba(50, 50, 50, 1);
    margin-left: 3px;
    margin-bottom: 1px;
  }
`
