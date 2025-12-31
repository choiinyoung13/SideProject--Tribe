import { checkEmailExists } from '@/lib/utils/checkEmailExists'
import { useEffect, useState } from 'react'
import { emailRegex } from '@/lib/utils/checkInputValueValid'

interface EmailSectionProps {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>
  isEmailExists: boolean | null
  setIsEmailExists: React.Dispatch<React.SetStateAction<boolean | null>>
  disabled: boolean
}

export default function EmailSection({
  email,
  setEmail,
  setIsEmailValid,
  isEmailExists,
  setIsEmailExists,
  disabled,
}: EmailSectionProps) {
  const [warningText, setWarningText] = useState<string>('')
  const [successText, setSuccessText] = useState<string>('')
  const [isOtpEmailSent, setIsOtpEmailSent] = useState<boolean>(false)

  useEffect(() => {
    const result = emailRegex.test(email)
    setWarningText('')
    setSuccessText('')
    setIsEmailExists(null)
    setIsOtpEmailSent(false)
    setIsEmailValid(false)

    if (email.length > 0 && !result) {
      setWarningText('유효하지 않은 이메일 형식입니다.')
    }

    if (email.length > 0 && result) {
      setIsEmailValid(true)
      setSuccessText('유효한 이메일 형식입니다.')
    }
  }, [email, setIsEmailExists, setIsEmailValid])

  useEffect(() => {
    const result = emailRegex.test(email)

    if (
      email.length > 0 &&
      result &&
      !isEmailExists &&
      isEmailExists !== null
    ) {
      setSuccessText('사용 가능한 이메일입니다.')
    }

    if (email.length > 0 && result && isEmailExists) {
      setWarningText('이미 가입된 이메일입니다.')
    }
  }, [email, isEmailExists])

  useEffect(() => {
    const result = emailRegex.test(email)
    if (
      email.length > 0 &&
      result &&
      !isEmailExists &&
      isEmailExists !== null &&
      isOtpEmailSent
    ) {
      setSuccessText('해당 이메일로 인증번호를 전송했습니다.')
    }
  }, [email, isEmailExists, isOtpEmailSent])

  return (
    <div>
      {/* 이메일 입력 및 중복 확인 */}
      <div className="w-full flex mb-[8px] max-[600px]:mx-auto max-[600px]:items-center">
        <input
          className="flex-1 p-[10px_12px] text-[1rem] bg-[rgb(245,245,245)] border border-[rgba(220,220,220,1)] rounded-[6px] max-[600px]:text-[0.8rem] disabled:text-[rgba(120,120,120,1)]"
          disabled={disabled || isOtpEmailSent}
          type="text"
          placeholder="사용하실 이메일을 입력해주세요"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <button
          className="h-[46px] w-[100px] text-[0.9rem] font-[300] p-[12px] ml-[4px] bg-[rgba(30,30,30,1)] border-0 rounded-[6px] text-white cursor-pointer transition-colors duration-300 hover:bg-[rgba(50,50,50,1)] disabled:bg-[rgba(150,150,150,1)] disabled:cursor-not-allowed disabled:hover:bg-[rgba(150,150,150,1)] max-[600px]:h-[40px] max-[600px]:text-[0.8rem] max-[600px]:p-[10px_12px] max-[600px]:ml-[6px] max-[600px]:mb-[16px]"
          disabled={disabled || !(email.length > 0 && emailRegex.test(email))}
          type="button"
          onClick={async () => {
            if (emailRegex.test(email) && email.length > 0) {
              const result = await checkEmailExists(email, true)
              setIsEmailExists(result)
            }
          }}
        >
          중복확인
        </button>
      </div>

      {email.length > 0 && warningText && (
        <div className="text-[rgb(243,28,0)] text-[0.8rem] mt-[12px] ml-[2px]">
          {warningText}
        </div>
      )}
      {email.length > 0 && successText && !warningText && (
        <div className="text-[rgb(0,150,75)] text-[0.8rem] mt-[12px] ml-[2px]">
          {successText}
        </div>
      )}
    </div>
  )
}
