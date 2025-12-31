import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { changePassword } from '@/app/(afterLogin)/mypage/lib/user/changePassword'
import Swal from 'sweetalert2'
import type { UserInfoType } from '@/types/UserInfoType'

interface PasswordSectionProps {
  userInfo: UserInfoType
  currentPassword: string
  setCurrentPassword: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  isConfirmPasswordVisible: boolean
  setIsConfirmPasswordVisible: (value: boolean) => void
  isPasswordValid: boolean
  isConfirmPasswordValid: boolean
  warningText: string
  setWarningText: (value: string) => void
}

export function PasswordSection({
  userInfo,
  currentPassword,
  setCurrentPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isConfirmPasswordVisible,
  setIsConfirmPasswordVisible,
  isPasswordValid,
  isConfirmPasswordValid,
  warningText,
  setWarningText,
}: PasswordSectionProps) {
  const onPasswordChange = async () => {
    if (!isPasswordValid || !isConfirmPasswordValid) {
      setWarningText('비밀번호가 유효하지 않거나 일치하지 않습니다.')
      return
    }

    // 비밀번호 변경 API 호출
    const result = await changePassword(
      userInfo.email,
      currentPassword,
      password
    )
    if (!result.success) {
      Swal.fire({
        text: result.message,
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    } else {
      Swal.fire({
        text: result.message,
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      }).then(() => {
        setCurrentPassword('')
        setPassword('')
        setConfirmPassword('')
      })
      return
    }
  }

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between mb-[10px]">
        <div className="text-[1.2rem] font-[600] text-[rgba(50,50,50,1)] max-[768px]:text-[1.1rem]">
          비밀번호 변경
        </div>
      </div>
      <div className="[&_input]:w-full [&_input]:p-[10px] [&_input]:text-[1rem] [&_input]:bg-[rgb(245,245,245)] [&_input]:border [&_input]:border-[rgba(230,230,230,1)] [&_input]:rounded-[6px] [&_input]:focus:outline [&_input]:focus:outline-2 [&_input]:focus:outline-[rgba(30,30,30,1)] [&_input]:disabled:text-[rgba(150,150,150,1)]">
        {/* 기존 비밀번호 입력 필드 */}
        <div className="relative w-full mb-[10px] first:mt-[14px] last:mb-0 max-[768px]:[&_input]:text-[0.85rem]">
          <input
            type={'password'}
            placeholder="현재 비밀번호를 입력해주세요."
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
        </div>

        {/* 새로운 비밀번호 입력 필드 */}
        <div className="relative w-full mb-[10px] first:mt-[14px] last:mb-0 max-[768px]:[&_input]:text-[0.85rem]">
          <input
            type={'password'}
            placeholder="새 비밀번호를 입력해주세요."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div className="relative w-full mb-[10px] first:mt-[14px] last:mb-0 max-[768px]:[&_input]:text-[0.85rem]">
          <input
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호 확인을 위해 다시 입력해주세요."
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="pr-[40px]"
          />
          <div
            className="absolute right-[14px] top-1/2 -translate-y-1/2 cursor-pointer text-[1.2rem] text-black"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            {isConfirmPasswordVisible ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </div>
        </div>

        {/* 경고 메시지 출력 */}
        {warningText && (
          <div className="text-red-600 text-[0.9rem] mt-[14px] mb-0 ml-[8px]">
            {warningText}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="transition-colors duration-300 bg-[rgb(30,30,30,1)] text-white border-0 rounded-[6px] p-[10px_20px] cursor-pointer text-[0.9rem] mt-[16px] hover:bg-[rgb(50,50,50,1)] disabled:bg-[rgba(150,150,150,1)] disabled:cursor-not-allowed"
          disabled={!isPasswordValid || !isConfirmPasswordValid}
          onClick={onPasswordChange} // 비밀번호 변경 버튼 핸들러 연결
        >
          비밀번호 변경
        </button>
      </div>
    </section>
  )
}
