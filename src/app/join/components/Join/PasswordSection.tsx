import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { passwordRegex } from '@/lib/utils/checkInputValueValid'

interface PasswordSectionProps {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
  setIsConfirmPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
  disabled: boolean
}

// 비밀번호 입력 섹션
export default function PasswordSection({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setIsPasswordValid,
  setIsConfirmPasswordValid,
  disabled,
}: PasswordSectionProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false) // 비밀번호 가시성 상태
  const [warningText, setWarningText] = useState<string>('')
  const [successText, setSuccessText] = useState<string>('')
  const [infoText] = useState<string>(
    '비밀번호는 영문자, 숫자, 특수문자 중 2가지 이상 포함한 6~20자여야 합니다.'
  )

  useEffect(() => {
    const result = passwordRegex.test(password)
    setWarningText('')
    setSuccessText('')
    setIsPasswordValid(false)

    if (password && confirmPassword && password !== confirmPassword) {
      setWarningText('비밀번호가 일치하지 않습니다.')
      setIsConfirmPasswordValid(false)
    }

    if (password && result) {
      setSuccessText('사용 가능한 비밀번호입니다.')
      setIsPasswordValid(true)
    }

    if (password && !result) {
      setWarningText('유효하지 않은 비밀번호 형식입니다.')
    }

    if (password && confirmPassword && password === confirmPassword) {
      setSuccessText('비밀번호가 일치합니다.')
      setIsConfirmPasswordValid(true)
    }
  }, [confirmPassword, password, setIsConfirmPasswordValid, setIsPasswordValid])

  useEffect(() => {
    setWarningText('')
    setSuccessText('')
    setIsPasswordValid(false)

    const result = passwordRegex.test(password)
    if (password && result) {
      setSuccessText('사용 가능한 비밀번호입니다.')
      setIsPasswordValid(true)
    }

    if (password && !result) {
      setWarningText('유효하지 않은 비밀번호 형식입니다.')
    }

    if (confirmPassword && password !== confirmPassword) {
      setWarningText('비밀번호가 일치하지 않습니다.')
      setIsConfirmPasswordValid(false)
    }

    if (password && confirmPassword && password === confirmPassword) {
      setSuccessText('비밀번호가 일치합니다.')
      setIsConfirmPasswordValid(true)
    }
  }, [confirmPassword, password, setIsConfirmPasswordValid, setIsPasswordValid])

  return (
    <>
      {/* 비밀번호 입력 */}
      <div className="w-full">
        <input
          className="p-[10px_12px] text-[1rem] w-full bg-[rgb(245,245,245)] border border-[rgba(220,220,220,1)] rounded-[6px] mt-[20px] max-[600px]:text-[0.8rem] max-[600px]:m-[0_auto_7px]"
          disabled={disabled}
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      {/* 비밀번호 확인 입력 */}
      <div className="relative w-full max-[600px]:flex">
        <input
          className="p-[10px_12px] text-[1rem] w-full bg-[rgb(245,245,245)] border border-[rgba(220,220,220,1)] rounded-[6px] mt-[8px] mb-[8px] max-[600px]:text-[0.8rem] max-[600px]:m-[0_auto_14px]"
          disabled={disabled}
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value)
          }}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="비밀번호 확인을 위해 다시 입력해주세요."
        />
        {/* 눈 모양 아이콘 */}
        <div
          className="absolute right-[14px] top-[60%] translate-y-[-70%] cursor-pointer text-[1.2rem] text-black max-[600px]:top-1/2 max-[600px]:right-[14px]"
          onClick={() => setIsPasswordVisible(prev => !prev)}
        >
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      </div>

      {/* 조건에 따른 메시지 출력 */}
      {password.length === 0 && confirmPassword.length === 0 && (
        <span className="text-[rgba(60,60,60,1)] text-[0.85rem] font-[500] m-[12px_0_35px_4px] max-[600px]:text-[0.7rem] max-[600px]:w-[85%] max-[600px]:m-[0_0_35px_4px]">
          {infoText}
        </span>
      )}

      {password.length === 0 && confirmPassword.length > 0 && (
        <span className="text-[rgba(60,60,60,1)] text-[0.85rem] font-[500] m-[12px_0_35px_4px] max-[600px]:text-[0.7rem] max-[600px]:w-[85%] max-[600px]:m-[0_0_35px_4px]">
          {infoText}
        </span>
      )}

      {password.length > 0 && successText && !warningText && (
        <span className="text-[rgb(0,150,75)] text-[0.85rem] m-[12px_0_35px_4px] max-[600px]:text-[0.7rem] max-[600px]:w-[85%] max-[600px]:m-[0_auto]">
          {successText}
        </span>
      )}
      {password.length > 0 && warningText && (
        <span className="text-[rgb(243,28,0)] text-[0.85rem] m-[12px_0_35px_4px] max-[600px]:text-[0.7rem] max-[600px]:w-[85%] max-[600px]:m-[0_auto]">
          {warningText}
        </span>
      )}
    </>
  )
}
