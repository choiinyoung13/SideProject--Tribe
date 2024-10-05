import styled from 'styled-components'
import { FaSeedling } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import ReactDOM from 'react-dom'

interface GuidelinesModalProps {
  onClose: () => void
}

export default function GuidelinesModal({ onClose }: GuidelinesModalProps) {
  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoCloseSharp size={24} />
        </CloseButton>
        <Section>
          <SectionTitle>
            <FaSeedling size={20} color="#8BC34A" /> 일반 규칙
          </SectionTitle>
          <List>
            <ListItem>
              🌱 다른 회원들에게 항상 존중과 친절을 보여주세요.
            </ListItem>
            <ListItem>
              🌿 신뢰할 수 있고 정확한 식물 정보를 공유하세요.
            </ListItem>
            <ListItem>🌸 허가 없이 광고나 스팸을 게시하지 마세요.</ListItem>
            <ListItem>🍀 친근하고 환영하는 분위기를 유지하세요.</ListItem>
            <ListItem>🌵 모욕적이거나 부적절한 언어 사용을 피하세요.</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>
            <FaSeedling size={20} color="#8BC34A" /> 게시물 작성 가이드라인
          </SectionTitle>
          <List>
            <ListItem>
              🌻 게시물의 제목은 명확하고 설명이 잘 되어 있어야 합니다.
            </ListItem>
            <ListItem>
              🍃 특정 식물에 대해 이야기할 때는 명확한 이미지를 업로드하세요.
            </ListItem>
            <ListItem>
              🌺 중복된 질문을 피하고, 게시하기 전에 검색하세요.
            </ListItem>
            <ListItem>🍂 게시물은 올바른 카테고리에 게시하세요.</ListItem>
          </List>
        </Section>
      </ModalContainer>
    </ModalOverlay>,
    document.body // 여기서 Portal을 사용해 document.body로 이동
  )
}

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1005;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  background-color: white;
  padding: 45px 35px;
  border-radius: 10px;
  width: 90%;
  min-width: 375px;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
`

const Section = styled.section`
  &:first-of-type {
    margin-bottom: 60px;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #2e7d32;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  font-size: 1.2rem;
  display: -webkit-box; /* Flexbox처럼 사용하여 줄 수 제한 */
  -webkit-line-clamp: 1; /* 1줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 ... 처리 */
  white-space: normal; /* 텍스트 줄바꿈을 허용 */

  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`
