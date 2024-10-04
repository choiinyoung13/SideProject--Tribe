import styled from 'styled-components'
import PostDetail from './PostDetail'
import { IoCloseSharp } from 'react-icons/io5'
import { useEffect } from 'react'
import { PostType } from '../../types/PostType'
import { useQueryClient } from 'react-query'

export default function PostDetailModal({
  userInfo,
  post,
  onClose,
}: {
  userInfo: {
    userId: string
    email: string
    avatar_url: string
    nickname: string
  }
  post: PostType
  onClose: () => void
}) {
  const queryClient = useQueryClient()

  useEffect(() => {
    // 모달이 열릴 때 posts 쿼리 리패치
    queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })

    // 모달이 열릴 때 body 스크롤 비활성화
    document.body.style.overflow = 'hidden'

    // 컴포넌트가 언마운트될 때 (모달이 닫힐 때) 스크롤을 다시 활성화
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <ModalOverlay onClick={onClose}>
      <CloseIcon>
        <IoCloseSharp />
      </CloseIcon>
      <ModalContent onClick={e => e.stopPropagation()}>
        <PostDetail userInfo={userInfo} post={post} onClose={onClose} />
      </ModalContent>
    </ModalOverlay>
  )
}

// 스타일 컴포넌트들

const CloseIcon = styled.div`
  position: absolute;
  z-index: 1003;
  top: 24px;
  right: 24px;
  font-size: 2.5rem;
  color: rgba(230, 230, 230, 1);
  cursor: pointer;

  @media (max-width: 800px) {
    top: 10px;
    right: 10px;
    font-size: 1.8rem;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1002;
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 375px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    padding: 0 16px;
  }
`

const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 24px;
  position: relative;
  max-width: 1100px; /* 최대 너비 설정 */
  max-height: 800px; /* 최대 높이를 90%로 설정 */
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 1200px) {
    max-width: 650px;
    padding: 20px;
  }
`
