import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { IoCloseSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'
import tribeLogo from '../../assets/images/logo/logo-tribe.png'
import { uploadImagesToStorageAndGetUrl } from '../../config/api/post/uploadImagesToStorageAndGetUrl'
import { useMutation, useQueryClient } from 'react-query'
import { insertPost } from '../../config/api/post/insertPost'
import Spinner from '../Common/Spinner'
import { useAuth } from '../../hooks/useAuth'

const categories = ['잡담', '이벤트', '질문', '나눔', '정보', '기타']

export default function PostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<File[]>([]) // 여러 이미지 상태 관리
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState<string>('')
  const queryClient = useQueryClient()
  const { session } = useAuth()

  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 비활성화
    document.body.style.overflow = 'hidden'

    // 컴포넌트가 언마운트될 때 (모달이 닫힐 때) 스크롤을 다시 활성화
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const { mutate } = useMutation(insertPost, {
    onSuccess: () => {
      Swal.fire({
        text: '게시글이 작성 되었습니다.',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })

      // 게시글이 성공적으로 저장되면, 기존 게시글 및 카테고리 쿼리를 무효화하고 새로 가져옴
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
      queryClient.invalidateQueries({ queryKey: ['categories'], exact: false })

      // 모달 닫기
      onClose()

      // 폼 초기화
      setTitle('')
      setContent('')
      setCategory('')
      setImages([])
    },
    onError: error => {
      console.error('게시글 저장 오류:', error)
      Swal.fire({
        text: '게시글 저장 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    },
  })

  // Ref를 사용하여 파일 입력 트리거
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // 드래그 앤 드롭 또는 클릭으로 이미지 입력 처리
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)

    // 현재 이미지와 드래그 앤 드롭으로 추가한 이미지의 수 합산
    const totalImages = images.length + files.length

    // 이미지 개수가 7개를 초과할 경우 경고 모달 표시
    if (totalImages > 7) {
      Swal.fire({
        text: '이미지는 최대 7개까지만 입력할 수 있습니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    // 기존 이미지에 새로 드롭된 파일을 추가하여 상태 업데이트
    setImages(prev => [...prev, ...files].slice(0, 7)) // 최대 7개로 자름
  }

  // 클릭해서 파일 선택
  const handleDropClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    // 새로 선택한 파일이 있으면
    if (files.length > 0) {
      // 현재 이미지와 새로 선택한 이미지의 수 합산
      const totalImages = images.length + files.length

      // 이미지 개수가 7개를 초과할 경우 경고 모달 표시
      if (totalImages > 7) {
        Swal.fire({
          text: '이미지는 최대 7개까지만 입력할 수 있습니다.',
          icon: 'warning',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
        return
      }

      // 기존 이미지에 새로 선택한 파일을 추가하여 상태 업데이트
      setImages(prev => [...prev, ...files])
    }
  }

  // 이미지 삭제 처리
  const handleRemoveImage = (imageToRemove: File) => {
    setImages(images.filter(image => image !== imageToRemove))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  // 폼 제출 처리
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!title || !content || images.length === 0 || !category) {
      Swal.fire({
        text: '모든 필드를 입력해주세요',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    setIsLoading(true)

    // 이미지 업로드 후, 게시글 저장 요청
    const uploadedUrls = await uploadImagesToStorageAndGetUrl(images)

    await mutate({
      title,
      content,
      imgUrls: uploadedUrls,
      category,
      userId: session!.user.id,
    })

    setIsLoading(false)
  }

  return (
    <ModalOverlay>
      <ModalContent onSubmit={handleSubmit}>
        <ModalHeader>
          <img src={tribeLogo} alt="tribe logo" />
          <span>Tribe</span>
        </ModalHeader>
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

          {/* 카테고리 선택 */}
          <CategorySelectWrapper>
            <Select
              onChange={e => {
                setCategory(e.target.value)
              }}
            >
              <option>카테고리를 선택하세요.</option>
              {categories.map((category, i) => {
                return (
                  <option value={category} key={i}>
                    {category}
                  </option>
                )
              })}
            </Select>
          </CategorySelectWrapper>

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
          <ImagePreviewContainer
            isImageExisted={images.length === 0 ? false : true}
          >
            {/* 커버 이미지 */}

            {images[0] && (
              <CoverImageWrapper>
                <CoverImage
                  src={URL.createObjectURL(images[0])}
                  alt="Cover Image"
                />
                <RemoveButton onClick={() => handleRemoveImage(images[0])}>
                  <IoCloseSharp />
                </RemoveButton>
                <Label>커버 이미지</Label>
              </CoverImageWrapper>
            )}

            {/* 추가 이미지 */}
            <AdditionalImagesWrapper>
              {images.slice(1).map((image, index) => {
                const imageUrl = URL.createObjectURL(image)
                return (
                  <ImageWrapper key={index}>
                    <AdditionalImage
                      src={imageUrl}
                      alt={`Uploaded ${index + 1}`}
                    />
                    <RemoveButton onClick={() => handleRemoveImage(image)}>
                      <IoCloseSharp />
                    </RemoveButton>
                  </ImageWrapper>
                )
              })}
            </AdditionalImagesWrapper>
          </ImagePreviewContainer>
        </ModalBody>

        {/* 하단 저장 및 취소 버튼 */}
        <ModalFooter>
          <SaveButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            ) : (
              '저장'
            )}
          </SaveButton>
          <CancelButton onClick={onClose} disabled={isLoading}>
            취소
          </CancelButton>
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

const ModalContent = styled.form`
  width: 600px;
  max-height: 90vh;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 14px;
  margin-left: 2px;

  span {
    margin-left: 8px;
  }

  img {
    width: 18px;
    height: 18px;
  }
`

const ModalBody = styled.div`
  flex: 1;
  margin-bottom: 20px;
`

const DropZone = styled.div`
  width: 100%;
  height: 138px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`

const CategorySelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    border: solid transparent;
    border-width: 6px 6px 0;
    border-top-color: #000;
    pointer-events: none;
  }
`

const Select = styled.select`
  width: 100%;
  font-size: 1rem;
  padding: 8px 10px;
  appearance: none;
  color: rgba(90, 90, 90, 1);
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
  resize: none;
`

interface ImagePreviewProps {
  isImageExisted: boolean
}

const ImagePreviewContainer = styled.div<ImagePreviewProps>`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => (props.isImageExisted ? '20px' : '0px')};
`

const CoverImageWrapper = styled.div`
  flex: 2;
  position: relative;
  width: 60%;
  height: 220px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const Label = styled.div`
  width: 100%;
  text-align: center;
  padding: 5px 0;
  font-size: 0.8rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
`

const AdditionalImagesWrapper = styled.div`
  flex: 3;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 10px;
`

const ImageWrapper = styled.div`
  flex-basis: calc(33.33% - 7px);
  height: 48%;
  position: relative;
`

const AdditionalImage = styled.img`
  width: 100%;
  height: 100%;
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

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CancelButton = styled.button`
  background-color: #ccc;
  color: #fff;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 66px;
  height: 46px;
  font-size: 1rem;

  &:hover {
    background-color: #999;
  }
`

const SaveButton = styled.button`
  background-color: #141414;
  color: #fff;

  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 66px;
  height: 46px;
  font-size: 1rem;

  &:hover {
    background-color: #242424;
  }
`

const SpinnerWrapper = styled.div`
  padding-top: 5px;
`
