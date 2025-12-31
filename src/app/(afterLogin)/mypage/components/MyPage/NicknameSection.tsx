import Swal from 'sweetalert2'
import { changeNickname } from '@/app/(afterLogin)/mypage/lib/user/changeNickname'
import { useEffect, useState } from 'react'
import { nicknameRegex } from '@/lib/utils/checkInputValueValid'
import type { UserInfoType } from '@/types/UserInfoType'
import type { Dispatch, SetStateAction } from 'react'

interface NicknameSectionProps {
  userInfo: UserInfoType
  isNicknameEditMode: boolean
  setIsNicknameEditMode: (value: boolean) => void
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>
}

export function NicknameSection({
  userInfo,
  isNicknameEditMode,
  setIsNicknameEditMode,
  setUserInfo,
}: NicknameSectionProps) {
  const [initialNickname, setInitialNickname] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (!userInfo) return

    if (!userInfo.nickname) {
      setInitialNickname(userInfo.email.split('@')[0])
      setInputValue(userInfo.email.split('@')[0])
    } else {
      setInitialNickname(userInfo.nickname)
      setInputValue(userInfo.nickname)
    }
  }, [userInfo])

  const onSave = async (newNickname: string, id: string) => {
    if (!initialNickname) return

    if (!nicknameRegex.test(inputValue)) {
      Swal.fire({
        text: '유효하지 않은 닉네임 형식입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (initialNickname === inputValue) {
      Swal.fire({
        text: '현재 사용 중인 닉네임입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    const result = await changeNickname(newNickname, id)

    if (result.success) {
      setUserInfo(prev => ({
        ...prev,
        nickname: newNickname,
      }))
      setIsNicknameEditMode(false)

      Swal.fire({
        text: '닉네임이 성공적으로 변경되었습니다.',
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
          닉네임
        </div>
        <div>
          {!isNicknameEditMode && (
            <button onClick={() => setIsNicknameEditMode(true)}>수정</button>
          )}
          {isNicknameEditMode && (
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
                  setInputValue(initialNickname)
                  setIsNicknameEditMode(false)
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
          disabled={!isNicknameEditMode}
          type="text"
          value={inputValue}
          onChange={e => {
            if (isNicknameEditMode) setInputValue(e.target.value)
          }}
          style={{ pointerEvents: isNicknameEditMode ? 'auto' : 'none' }}
        />
        <p className="leading-[28px] mt-[10px] text-[rgba(120,120,120,1)] text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis max-[768px]:text-[0.8rem]">
          * 닉네임은 변경 후 30일이 지나야 다시 변경할 수 있습니다. <br />* 한글/영문/숫자만
          사용할 수 있으며 특수문자는 사용할 수 없습니다.{' '}
          <br />
        </p>
      </div>
    </section>
  )
}


