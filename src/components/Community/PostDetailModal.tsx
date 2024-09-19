import styled from 'styled-components'
import PostDetail from './PostDetail'
import { IoCloseSharp } from 'react-icons/io5'

// Mock 데이터로 게시물 상세 정보를 정의 (5개의 이미지로 가정)
const mockPostDetail = {
  id: '1',
  author: 'dlsdud156',
  authorProfileImage: 'https://via.placeholder.com/50',
  content: '채광이 부족한 환경에서도 잘 자라는 식물들을 소개합니다.',
  images: [
    'https://via.placeholder.com/600x600',
    'https://via.placeholder.com/600x601',
    'https://via.placeholder.com/600x602',
    'https://via.placeholder.com/600x603',
    'https://via.placeholder.com/600x604',
  ],
  likes: 3400,
  comments: [
    { id: 1, user: 'user123', text: '정말 유용한 정보네요!' },
    { id: 2, user: 'plantlover', text: '이 식물들 꼭 키워보고 싶어요!' },
  ],
}

export default function PostDetailModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalOverlay onClick={onClose}>
      <CloseIcon>
        <IoCloseSharp />
      </CloseIcon>
      <ModalContent onClick={e => e.stopPropagation()}>
        <PostDetail post={mockPostDetail} />
      </ModalContent>
    </ModalOverlay>
  )
}

// 스타일 컴포넌트들

const CloseIcon = styled.div`
  position: absolute;
  z-index: 1003;
  top: 30px;
  right: 30px;
  font-size: 3rem;
  color: rgba(230, 230, 230, 1);
  cursor: pointer;
`

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1002;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  width: 500px;
  max-height: 80vh; /* 높이가 커지면 스크롤 처리 */
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  overflow-y: scroll; /* 스크롤은 가능하지만, 스크롤바는 숨깁니다 */

  /* 스크롤바 숨기기 (웹킷 브라우저) */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 스크롤바 숨기기 (Firefox) */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */

  /* 스크롤바 숨기기 (Edge 및 기타 브라우저) */
  -ms-overflow-style: none; /* Internet Explorer 및 Edge에서 스크롤바 숨기기 */
`
