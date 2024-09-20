import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { supabase } from "../../supabase/supabaseClient";
import { useRecoilState } from "recoil";
import { PostState } from "../../recoil/atoms/PostState";

export default function PostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]); // 여러 이미지 상태 관리
  const [posts, setPosts] = useRecoilState(PostState);
  const [isStorageLoading, setIsStorageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ref를 사용하여 파일 입력 트리거
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 드래그 앤 드롭 또는 클릭으로 이미지 입력 처리
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 7) {
      Swal.fire({
        text: "이미지는 최대 7개까지만 입력할 수 있습니다.",
        icon: "warning",
        confirmButtonColor: "#1E1E1E",
        confirmButtonText: "확인",
        scrollbarPadding: false,
      });
      return;
    }
    setImages((prev) => [...prev, ...files].slice(0, 7)); // 최대 7개 제한
  };

  // 클릭해서 파일 선택
  const handleDropClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 7) {
      Swal.fire({
        text: "이미지는 최대 7개까지만 입력할 수 있습니다.",
        icon: "warning",
        confirmButtonColor: "#1E1E1E",
        confirmButtonText: "확인",
        scrollbarPadding: false,
      });
      return;
    }
    setImages(files);
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (imageToRemove: File) => {
    setImages(images.filter((image) => image !== imageToRemove));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 이미지 업로드 함수
  const uploadImages = async (images: File[]) => {
    setIsStorageLoading(true);

    const uploadedUrls = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${i}.${fileExt}`;
      const { error } = await supabase.storage
        .from("tribe posts images")
        .upload(fileName, file);

      if (error) {
        console.error("이미지 업로드 오류:", error.message);
        return;
      }

      // 업로드된 파일의 경로로 public URL 가져오기
      const { data } = supabase.storage
        .from("tribe posts images")
        .getPublicUrl(fileName);
      if (data?.publicUrl) {
        uploadedUrls.push(data.publicUrl);
      } else {
        console.error("Public URL을 가져올 수 없습니다.");
      }
    }

    setIsStorageLoading(false);
    return uploadedUrls;
  };

  // 폼 제출 처리
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    e.preventDefault();

    if (!title || !content || images.length === 0) {
      Swal.fire({
        text: "모든 필드를 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#1E1E1E",
        confirmButtonText: "확인",
        scrollbarPadding: false,
      });
      return;
    }

    // 이미지 업로드
    const uploadedUrls = await uploadImages(images);

    // 게시글 데이터 저장
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, img_urls: uploadedUrls }]);

    if (error) {
      console.error("게시글 저장 오류:", error);
      return;
    }
    setIsLoading(false);

    if (data) {
      // data가 null이 아닐 때만 posts에 추가
      setPosts([...data, ...posts]);
    } else {
      console.error("삽입된 데이터가 없습니다.");
    }

    // 모달 닫기
    onClose();

    // 폼 초기화
    setTitle("");
    setContent("");
    setImages([]);
  };

  return (
    <ModalOverlay>
      <ModalContent onSubmit={handleSubmit}>
        <ModalBody>
          {/* 드래그 앤 드롭 영역 */}
          <DropZone
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleDropClick}
          >
            <p>이미지를 드래그 앤 드롭하거나 클릭하여 추가하세요 (최대 7개)</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              multiple
              style={{ display: "none" }}
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
                const imageUrl = URL.createObjectURL(image);
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
                );
              })}
            </AdditionalImagesWrapper>
          </ImagePreviewContainer>
        </ModalBody>

        {/* 하단 저장 및 취소 버튼 */}
        <ModalFooter>
          <SaveButton disabled={isStorageLoading || isLoading} type="submit">
            {isStorageLoading || isLoading ? "저장중" : "저장"}
          </SaveButton>
          <CancelButton
            disabled={isStorageLoading || isLoading}
            onClick={onClose}
          >
            취소
          </CancelButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
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
`;

const ModalContent = styled.form`
  width: 600px;
  max-height: 80vh;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ModalBody = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const DropZone = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const TextEditor = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 20px;
  resize: none;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
`;

const CoverImageWrapper = styled.div`
  position: relative;
  margin-right: 16px;
  margin-left: 3px;
`;

const CoverImage = styled.img`
  width: 200px;
  height: auto;
  border: 2px solid #007bff;
`;

const AdditionalImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: calc(100% - 200px); /* 커버 이미지 공간 제외 */
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const AdditionalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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
`;

const Label = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5px;
  font-size: 0.8rem;
  color: #666;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #fff;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #999;
  }
`;

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
`;
