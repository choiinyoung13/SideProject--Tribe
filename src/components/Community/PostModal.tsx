import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { IoCloseSharp } from 'react-icons/io5'

export default function PostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<string[]>([]) // 여러 이미지 상태 관리

  // Ref를 사용하여 파일 입력 트리거
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // 드래그 앤 드롭 또는 클릭으로 이미지 입력 처리
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    if (images.length + files.length > 7) {
      alert('이미지는 최대 7개까지만 추가할 수 있습니다.')
      return
    }
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages(prev => [...prev, ...newImages].slice(0, 7)) // 최대 7개 제한
  }

  // 클릭해서 파일 선택
  const handleDropClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // 이미지 업로드 처리
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (images.length + files.length > 7) {
      alert('이미지는 최대 7개까지만 추가할 수 있습니다.')
      return
    }
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages(prev => [...prev, ...newImages].slice(0, 7)) // 최대 7개 제한
  }

  // 이미지 삭제 처리
  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter(image => image !== imageToRemove))
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value)
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalBody>
          {/* 드래그 앤 드롭 영역 */}
          <DropZone
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={handleDropClick}
          >
            <p>이미지를 드래그 앤 드롭하거나 클릭하여 추가하세요 (최대 7개)</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              multiple
              style={{ display: 'none' }}
            />
          </DropZone>

          {/* 제목 입력 */}
          <TitleInput
            placeholder="제목을 입력하세요 (최대 30자)"
            maxLength={30}
            value={title}
            onChange={handleTitleChange}
            required
          />

          {/* 본문 입력 */}
          <TextEditor>
            <TextArea
              placeholder="본문을 입력하세요"
              value={content}
              onChange={handleContentChange}
            />
          </TextEditor>

          {/* 이미지 미리보기 */}
          <ImagePreviewContainer>
            {/* 커버 이미지 */}
            {images[0] && (
              <CoverImageWrapper>
                <CoverImage src={images[0]} alt="Cover Image" />
                <RemoveButton onClick={() => handleRemoveImage(images[0])}>
                  <IoCloseSharp />
                </RemoveButton>
                <Label>커버 이미지</Label>
              </CoverImageWrapper>
            )}

            {/* 추가 이미지 */}
            <AdditionalImagesWrapper>
              {images.slice(1).map((image, index) => (
                <ImageWrapper key={index}>
                  <AdditionalImage src={image} alt={`Uploaded ${index + 1}`} />
                  <RemoveButton onClick={() => handleRemoveImage(image)}>
                    <IoCloseSharp />
                  </RemoveButton>
                </ImageWrapper>
              ))}
            </AdditionalImagesWrapper>
          </ImagePreviewContainer>
        </ModalBody>

        {/* 하단 저장 및 취소 버튼 */}
        <ModalFooter>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SaveButton onClick={() => console.log('저장')}>저장</SaveButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  )
}

// 스타일 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1001;
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
  max-height: 80vh;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

const ModalBody = styled.div`
  flex: 1;
  margin-bottom: 20px;
`

const DropZone = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 20px;
`

const TextEditor = styled.div`
  display: flex;
  flex-direction: column;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 20px;
`

const ImagePreviewContainer = styled.div`
  display: flex;
`

const CoverImageWrapper = styled.div`
  position: relative;
  margin-right: 16px;
  margin-left: 3px;
`

const CoverImage = styled.img`
  width: 200px;
  height: auto;
  border: 2px solid #007bff;
`

const AdditionalImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: calc(100% - 200px); /* 커버 이미지 공간 제외 */
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`

const AdditionalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
`

const Label = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5px;
  font-size: 0.8rem;
  color: #666;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CancelButton = styled.button`
  background-color: #ccc;
  color: #fff;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #999;
  }
`

const SaveButton = styled.button`
  background-color: #141414;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #242424;
  }
`
