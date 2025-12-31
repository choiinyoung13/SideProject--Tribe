import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { statusMessageRegex } from '@/lib/utils/checkInputValueValid'
import { changeStatusMessage } from '@/app/(afterLogin)/mypage/lib/user/changeStatusMessage'
import type { UserInfoType } from '@/types/UserInfoType'
import type { Dispatch, SetStateAction } from 'react'

interface StatusMessageSectionProps {
  userInfo: UserInfoType
  isStatusMessageEditMode: boolean
  setIsStatusMessageEditMode: (value: boolean) => void
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>
}

export function StatusMessageSection({
  userInfo,
  isStatusMessageEditMode,
  setIsStatusMessageEditMode,
  setUserInfo,
}: StatusMessageSectionProps) {
  const [initialStatusMessage, setInitialStatusMessage] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (!userInfo) return
    setInitialStatusMessage(!userInfo.status_message ? '' : userInfo.status_message)
    setInputValue(!userInfo.status_message ? '' : userInfo.status_message)
  }, [userInfo])

  const onSave = async (newMessage: string, id: string) => {
    if (!inputValue || !inputValue.trim()) {
      Swal.fire({
        text: '상태 메시지를 입력해주세요.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (!statusMessageRegex.test(inputValue)) {
      Swal.fire({
        text: '유효하지 않은 상태 메시지 형식입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (initialStatusMessage === inputValue) {
      Swal.fire({
        text: '이전과 같은 상태 메시지입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    const noPreTrimInputValue = inputValue.replace(/^\s+/, '')
    const result = await changeStatusMessage(noPreTrimInputValue, id)

    if (result.success) {
      const noPreTrimNewMessage = newMessage.replace(/^\s+/, '')
      setUserInfo(prev => ({
        ...prev,
        status_message: noPreTrimNewMessage,
      }))
      setIsStatusMessageEditMode(false)

      Swal.fire({
        text: '상태 메시지가 성공적으로 변경되었습니다.',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    }
  }

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between mb-[10px] [&_button]:bg-transparent [&_button]:border-0 [&_button]:cursor-pointer [&_button]:text-[1rem] [&_button]:text-[rgb(0,109,235)]">
        <div className="text-[1.2rem] font-[600] text-[rgba(50,50,50,1)] max-[768px]:text-[1.1rem]">
          상태 메시지
        </div>
        <div>
          {!isStatusMessageEditMode && (
            <button onClick={() => setIsStatusMessageEditMode(true)}>수정</button>
          )}
          {isStatusMessageEditMode && (
            <div className="flex">
              <button
                onClick={() => {
                  onSave(inputValue, userInfo.id)
                }}
              >
                저장
              </button>
              <button
                onClick={() => {
                  setInputValue(initialStatusMessage)
                  setIsStatusMessageEditMode(false)
                }}
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-[768px]:[&_input]:text-[0.85rem] [&_input]:w-full [&_input]:p-[10px] [&_input]:text-[1rem] [&_input]:bg-[rgb(245,245,245)] [&_input]:border [&_input]:border-[rgba(230,230,230,1)] [&_input]:rounded-[6px] [&_input]:focus:outline [&_input]:focus:outline-2 [&_input]:focus:outline-[rgba(30,30,30,1)] [&_input]:disabled:text-[rgba(150,150,150,1)]">
        <input
          draggable={false}
          disabled={!isStatusMessageEditMode}
          type="text"
          value={inputValue}
          onChange={e => {
            if (isStatusMessageEditMode) setInputValue(e.target.value)
          }}
          style={{ pointerEvents: isStatusMessageEditMode ? 'auto' : 'none' }}
        />
        <p className="leading-[28px] mt-[10px] text-[rgba(120,120,120,1)] text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis max-[768px]:text-[0.8rem]">
          * 상태 메시지를 등록해서 본인의 정보를 다른 유저들에게 설명해 주세요.{' '}
          <br />* 한글/영문/숫자/특수문자만 사용할 수 있습니다.
        </p>
      </div>
    </section>
  )
}


