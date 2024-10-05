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
import GuidelinesModal from '../../components/Community-features/GuidelinesModal'

const categories = ['잡담', '이벤트', '질문', '나눔', '정보', '기타']

export default function PostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState<string>('')
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false) // 가이드라인 모달 상태 추가
  const queryClient = useQueryClient()
  const { session } = useAuth()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

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

      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
      queryClient.invalidateQueries({ queryKey: ['categories'], exact: false })

      onClose()
      setTitle('')
      setContent('')
      setCategory('')
      setImages([])
    },
    onError: () => {
      Swal.fire({
        text: '게시글 저장 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    },
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)

    const totalImages = images.length + files.length
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
    setImages(prev => [...prev, ...files].slice(0, 7))
  }

  const handleDropClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length > 0) {
      const totalImages = images.length + files.length
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
      setImages(prev => [...prev, ...files])
    }
  }

  const handleRemoveImage = (imageToRemove: File) => {
    setImages(images.filter(image => image !== imageToRemove))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

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
    <>
      {/* 가이드라인 모달 */}
      {showGuidelinesModal && (
        <GuidelinesModal onClose={() => setShowGuidelinesModal(false)} />
      )}

      <ModalOverlay>
        <ModalContent onSubmit={handleSubmit}>
          <ModalHeader>
            <div>
              <img src={tribeLogo} alt="tribe logo" />
              <span>Tribe</span>
            </div>
            <GuideLineButton
              type="button"
              onClick={() => setShowGuidelinesModal(true)}
            >
              작성 규칙
            </GuideLineButton>
          </ModalHeader>
          <ModalBody>
            <DropZone
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={handleDropClick}
            >
              <p>
                이미지를 드래그 앤 드롭하거나 클릭하여 추가하세요 (최대 7개)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                multiple
                style={{ display: 'none' }}
              />
            </DropZone>

            <CategorySelectWrapper>
              <Select onChange={e => setCategory(e.target.value)}>
                <option>카테고리를 선택하세요.</option>
                {categories.map((category, i) => (
                  <option value={category} key={i}>
                    {category}
                  </option>
                ))}
              </Select>
            </CategorySelectWrapper>

            <TitleInput
              placeholder="제목을 입력하세요 (최대 30자)"
              maxLength={30}
              value={title}
              onChange={handleTitleChange}
              required
            />

            <TextEditor>
              <TextArea
                placeholder="본문을 입력하세요"
                value={content}
                onChange={handleContentChange}
              />
            </TextEditor>

            <ImagePreviewContainer
              isImageExisted={images.length === 0 ? false : true}
            >
              {images[0] && (
                <CoverImageWrapper>
                  <CoverImage
                    src={URL.createObjectURL(images[0])}
                    alt="Cover Image"
                  />
                  <RemoveButton
                    type="button"
                    onClick={() => handleRemoveImage(images[0])}
                  >
                    <IoCloseSharp />
                  </RemoveButton>
                  <Label>커버 이미지</Label>
                </CoverImageWrapper>
              )}

              <AdditionalImagesWrapper>
                {images.slice(1).map((image, index) => (
                  <ImageWrapper key={index}>
                    <AdditionalImage
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                    />
                    <RemoveButton onClick={() => handleRemoveImage(image)}>
                      <IoCloseSharp />
                    </RemoveButton>
                  </ImageWrapper>
                ))}
              </AdditionalImagesWrapper>
            </ImagePreviewContainer>
          </ModalBody>

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
    </>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 375px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`

const ModalContent = styled.form`
  position: relative;
  z-index: 1001;
  min-width: 375px;
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
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 14px;
  margin-left: 2px;

  div {
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 8px;
  }

  img {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 600px) {
    span {
      font-size: 1rem;
    }

    img {
      width: 15px;
      height: 15px;
    }
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
  padding: 0 20px;

  @media (max-width: 600px) {
    p {
      font-size: 0.8rem;
    }
  }
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

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
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

  @media (max-width: 600px) {
    font-size: 0.9rem;
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

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`

const SpinnerWrapper = styled.div`
  padding-top: 5px;
`

const GuideLineButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  color: rgb(0, 89, 223);

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`
