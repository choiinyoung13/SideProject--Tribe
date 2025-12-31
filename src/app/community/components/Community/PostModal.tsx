'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ImageIcon,
  Info,
  Sparkles,
  X,
} from 'lucide-react'
import Swal from 'sweetalert2'
import tribeLogo from '@/assets/images/logo/logo-tribe.png'
import { uploadImagesToStorageAndGetUrl } from '@/app/community/lib/post/uploadImagesToStorageAndGetUrl'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertPost } from '@/app/community/lib/post/insertPost'
import Spinner from '@/components/Common/Spinner'
import { useAuth } from '@/hooks/useAuth'
import GuidelinesModal from '@/components/Common/GuidelinesModal'
import { assetSrc } from '@/shared/lib/asset'

const CATEGORY_OPTIONS: { id: string; label: string; desc: string }[] = [
  { id: '잡담', label: '잡담', desc: '자유롭게 식물 이야기를 나눠요' },
  { id: '질문', label: '질문', desc: '식물 고수들에게 물어보세요' },
  { id: '정보', label: '정보', desc: '나만의 식물 관리 팁 공유' },
  { id: '나눔', label: '나눔', desc: '식물이나 자구를 나눠요' },
  { id: '이벤트', label: '이벤트', desc: '모임/행사 소식 공유' },
  { id: '기타', label: '기타', desc: '기타 이야기' },
]

export default function PostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState<string>('질문')
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false)
  const queryClient = useQueryClient()
  const { session } = useAuth()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const { mutate } = useMutation({
    mutationFn: insertPost,
    onSuccess: () => {
      Swal.fire({
        text: '게시글을 작성했습니다.',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })

      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
      queryClient.invalidateQueries({
        queryKey: ['community', 'categories'],
        exact: false,
      })

      onClose()
      setTitle('')
      setContent('')
      setCategory('')
      setImages([])
    },
    onError: () => {
      Swal.fire({
        text: '게시글 등록 중 오류가 발생했습니다.',
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
        text: '이미지는 최대 7장까지만 업로드할 수 있습니다.',
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
          text: '이미지는 최대 7장까지만 업로드할 수 있습니다.',
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
        text: '모든 필드를 입력해주세요.',
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

      <div
        className="fixed z-[1000] inset-0 bg-black/20 backdrop-blur-[2px] overflow-y-auto"
        onClick={onClose}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">돌아가기</span>
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setShowGuidelinesModal(true)}
              >
                작성 가이드
              </button>
              <button
                type="submit"
                form="community-write-form"
                disabled={isLoading}
                className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-60"
              >
                {isLoading ? <Spinner width={16} height={16} /> : '등록하기'}
              </button>
            </div>
          </div>

          <form id="community-write-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Editor Area */}
              <div className="lg:col-span-8 space-y-6">
                {/* Category Selection */}
                <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm flex overflow-x-auto">
                  {CATEGORY_OPTIONS.map(cat => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`flex-1 min-w-[80px] py-3 rounded-xl text-sm font-medium transition-all duration-200 ${category === cat.id
                          ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100'
                          : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Editor */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                  <div className="p-8 space-y-6 flex-grow">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-[18px] h-[18px]"
                        src={assetSrc(tribeLogo)}
                        alt="tribe logo"
                      />
                      <span className="text-sm font-bold text-gray-500">Tribe</span>
                    </div>

                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="제목을 입력하세요"
                      maxLength={30}
                      className="w-full text-3xl font-heading font-bold placeholder-gray-300 border-none outline-none bg-transparent"
                    />
                    <div className="h-px w-full bg-gray-50" />
                    <textarea
                      value={content}
                      onChange={handleContentChange}
                      placeholder={
                        category === '질문'
                          ? '궁금한 식물의 상태, 물주기 패턴, 환경(빛, 통풍) 등을 자세히 적어주시면 더 정확한 답변을 받을 수 있어요.'
                          : '식물 친구들과 나누고 싶은 이야기를 자유롭게 적어보세요.'
                      }
                      className="w-full h-full min-h-[280px] resize-none text-lg leading-relaxed placeholder-gray-300 border-none outline-none bg-transparent"
                    />

                    {/* Image previews */}
                    <div className="space-y-3">
                      {images.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          {images.map((image, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100"
                            >
                              <img
                                className="w-full h-full object-cover"
                                src={URL.createObjectURL(image)}
                                alt={`uploaded-${idx}`}
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur border border-gray-100 text-gray-700 hover:text-gray-900"
                                onClick={() => handleRemoveImage(image)}
                                aria-label="이미지 제거"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/40 p-6 text-center text-sm text-gray-500"
                          onDrop={handleDrop}
                          onDragOver={e => e.preventDefault()}
                          onClick={handleDropClick}
                        >
                          이미지를 드래그앤드롭하거나 클릭하여 추가해주세요. (최대 7장)
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        multiple
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="bg-gray-50/50 p-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="p-2 text-gray-500 hover:bg-white hover:text-emerald-600 rounded-lg transition-colors shadow-sm"
                        onClick={handleDropClick}
                      >
                        <ImageIcon size={20} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      {content.length} 자
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Contextual Help */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50" />
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 relative z-10">
                    {category === '질문' ? (
                      <>
                        <HelpCircle className="text-emerald-500" size={20} /> 질문 꿀팁
                      </>
                    ) : category === '나눔' ? (
                      <>
                        <Sparkles className="text-emerald-500" size={20} /> 나눔 가이드
                      </>
                    ) : (
                      <>
                        <Info className="text-emerald-500" size={20} /> 작성 가이드
                      </>
                    )}
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {category === '질문' ? (
                      <>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>
                            식물의 <strong>전체 사진</strong>과 <strong>문제 부위 확대 사진</strong>을 함께 올려주세요.
                          </span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>평소 물주기 빈도와 화분을 둔 장소를 알려주세요.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>언제부터 증상이 시작되었는지 적어주세요.</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>상호 존중하는 고운 말을 사용해주세요.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>저작권에 위배되는 사진은 사용하지 말아주세요.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">Botanica 에티켓</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Botanica는 식물을 사랑하는 사람들이 모인 따뜻한 공간입니다. 비방, 욕설, 광고성 글은 통보 없이 삭제될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
