import styled from 'styled-components'
import { checkEmailExists } from '../../utill/checkEmailExists'
import { useEffect, useState } from 'react'
import { emailRegex } from '../../utill/checkInputValueValid'

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
      setWarningText('유효하지 않은 이메일 형식입니다')
    }

    if (email.length > 0 && result) {
      setIsEmailValid(true)
      setSuccessText('유효한 이메일 형식입니다')
    }
  }, [email])

  useEffect(() => {
    const result = emailRegex.test(email)

    if (
      email.length > 0 &&
      result &&
      !isEmailExists &&
      isEmailExists !== null
    ) {
      setSuccessText('사용 가능한 이메일입니다')
    }

    if (email.length > 0 && result && isEmailExists) {
      setWarningText('이미 가입된 이메일입니다')
    }
  }, [isEmailExists])

  useEffect(() => {
    const result = emailRegex.test(email)
    if (
      email.length > 0 &&
      result &&
      !isEmailExists &&
      isEmailExists !== null &&
      isOtpEmailSent
    ) {
      setSuccessText('해당 이메일로 인증번호을 전송하였습니다')
    }
  }, [isOtpEmailSent])

  return (
    <EmailSectionCon>
      {/* 이메일 입력 및 중복 확인 */}
      <IdInputCon>
        <EmailInput
          disabled={disabled || isOtpEmailSent}
          type="text"
          placeholder="사용하실 이메일을 입력해주세요"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <button
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
      </IdInputCon>

      {email.length > 0 && warningText && (
        <WarningText>{warningText}</WarningText>
      )}
      {email.length > 0 && successText && !warningText && (
        <SuccessText>{successText}</SuccessText>
      )}
    </EmailSectionCon>
  )
}

const EmailSectionCon = styled.div``

const IdInputCon = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 8px;

  input {
    flex: 1;
    padding: 10px 12px;
    font-size: 1rem;
    background-color: rgb(245, 245, 245);
    border: 1px solid rgba(220, 220, 220, 1);
    border-radius: 6px;
  }

  button {
    height: 46px;
    width: 100px;
    font-size: 0.9rem;
    font-weight: 300;
    padding: 12px;
    margin-left: 4px;
    background-color: rgba(30, 30, 30, 1);
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(50, 50, 50, 1);
    }

    &:disabled {
      background-color: rgba(150, 150, 150, 1);
      cursor: not-allowed;
    }

    &:disabled:hover {
      background-color: rgba(150, 150, 150, 1); // hover 상태에서도 유지
    }
  }

  @media (max-width: 600px) {
    margin: 0 auto;
    align-items: center;

    input {
      font-size: 0.8rem;
    }

    button {
      height: 40px;
      font-size: 0.8rem;
      padding: 10px 12px;
      margin-left: 6px;
      margin-bottom: 16px;
    }
  }
`

const EmailInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }

  &:disabled {
    color: rgba(120, 120, 120, 1);
  }
`

const WarningText = styled.div`
  color: rgb(243, 28, 0);
  font-size: 0.8rem;
  margin-top: 12px;
  margin-left: 2px;
`

const SuccessText = styled.div`
  color: rgb(0, 150, 75);
  font-size: 0.8rem;
  margin-top: 12px;
  margin-left: 2px;
`
