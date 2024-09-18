import styled from 'styled-components'
import PostDetail from './PostDetail'

// Mock 데이터로 게시물 상세 정보를 정의 (5개의 이미지로 가정)
const mockPostDetail = {
  id: '1',
  author: 'dlsdud156',
  authorProfileImage: 'https://via.placeholder.com/50',
  content: '채광이 부족한 환경에서도 잘 자라는 식물들을 소개합니다.',
  images: [
    'https://via.placeholder.com/600x300',
    'https://via.placeholder.com/600x301',
    'https://via.placeholder.com/600x302',
    'https://via.placeholder.com/600x303',
    'https://via.placeholder.com/600x304',
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
      <ModalContent onClick={e => e.stopPropagation()}>
        <PostDetail post={mockPostDetail} />
      </ModalContent>
    </ModalOverlay>
  )
}

// 스타일 컴포넌트들
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
  width: 600px;
  max-height: 80vh; /* 높이가 커지면 스크롤 처리 */
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  overflow-y: auto; /* 모달 내용 스크롤 처리 */
`
