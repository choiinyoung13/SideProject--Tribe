import styled from 'styled-components'
import {
  sendVerificationEmail,
  verifyOtpCode,
} from '../../config/api/user/ChangeEmail'
import { checkEmailExists } from '../../utill/checkEmailExists'
import { useEffect, useState } from 'react'
import { emailRegex } from '../../utill/checkInputValueValid'
import Spinner from '../Common/Spinner'

interface EmailSectionProps {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>
  isEmailExists: boolean | null
  setIsEmailExists: React.Dispatch<React.SetStateAction<boolean | null>>
  setIsConfirmedEmail: React.Dispatch<React.SetStateAction<boolean>>
  isOtpValid: boolean
  setIsOtpValid: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EmailSection({
  email,
  setEmail,
  setIsEmailValid,
  isEmailExists,
  setIsEmailExists,
  setIsConfirmedEmail,
  isOtpValid,
  setIsOtpValid,
}: EmailSectionProps) {
  const [warningText, setWarningText] = useState<string>('')
  const [successText, setSuccessText] = useState<string>('')
  const [isOtpEmailSent, setIsOtpEmailSent] = useState<boolean>(false)
  const [isSendVerificationEmailLoading, setSendVerificationEmailLoading] =
    useState<boolean>(false)

  const [otp, setOtp] = useState<string>('')

  useEffect(() => {
    const result = emailRegex.test(email)
    setWarningText('')
    setSuccessText('')
    setIsEmailExists(null)
    setIsOtpEmailSent(false)
    setIsEmailValid(false)
    setIsConfirmedEmail(false)

    if (email.length > 0 && !result) {
      setWarningText('유효한 이메일 형식이 아닙니다')
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
      setSuccessText('사용 가능한 이메일입니다. (이메일 인증 필수)')
    }

    if (email.length > 0 && result && isEmailExists) {
      setWarningText('이미 가입된 이메일입니다.')
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
      setSuccessText('해당 이메일로 인증번호을 전송하였습니다.')
    }
  }, [isOtpEmailSent])

  useEffect(() => {
    const result = emailRegex.test(email)

    if (
      email.length > 0 &&
      result &&
      !isEmailExists &&
      isEmailExists !== null &&
      isOtpEmailSent &&
      isOtpValid
    ) {
      setSuccessText('인증 완료 되었습니다.')
    }
  }, [isOtpValid])

  return (
    <EmailSectionCon>
      {/* 이메일 입력 및 중복 확인 */}
      <IdInputCon>
        <EmailInput
          disabled={isOtpEmailSent}
          type="text"
          placeholder="사용하실 이메일을 입력해주세요."
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        {isEmailExists === null ? (
          <button
            disabled={!(email.length > 0 && emailRegex.test(email))}
            type="button"
            onClick={async () => {
              if (emailRegex.test(email) && email.length > 0) {
                const result = await checkEmailExists(email)
                setIsEmailExists(result)
              }
            }}
          >
            중복확인
          </button>
        ) : (
          <VerificationEmailButton
            disabled={
              isSendVerificationEmailLoading || isOtpEmailSent || isOtpValid
            }
            type="button"
            onClick={async () => {
              // 이미 가입한 이메일이 존재할 경우 인증문자를 보내지 않음
              if (isEmailExists) return

              // 인증코드 입력한 이메일로 보내기
              await setSendVerificationEmailLoading(true)
              const res = await sendVerificationEmail(email)
              if (res.success) {
                setIsConfirmedEmail(true)
              }
              setSendVerificationEmailLoading(false)
              setIsOtpEmailSent(res.success)
            }}
          >
            {isOtpValid ? (
              '인증 완료'
            ) : isSendVerificationEmailLoading ? (
              <Spinner width={20} height={20} />
            ) : (
              '이메일 인증'
            )}
          </VerificationEmailButton>
        )}
      </IdInputCon>

      {/* 인증번호 입력 섹션 */}
      {isOtpEmailSent && !isOtpValid && (
        <IdInputCon>
          <OtpInput
            type="text"
            placeholder="인증번호 6자리를 입력해주세요"
            value={otp}
            onChange={e => {
              setOtp(e.target.value)
            }}
          />
          <button
            type="button"
            onClick={async () => {
              const result = await verifyOtpCode(email, otp)
              setIsOtpValid(result.success)
            }}
          >
            코드제출
          </button>
        </IdInputCon>
      )}

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
      font-size: 0.8rem;
      padding: 10px 12px;
      margin-left: 6px;
    }
  }
`

const VerificationEmailButton = styled.button`
  background-color: rgba(30, 30, 30, 1);
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
    cursor: not-allowed;
  }
`

const OtpInput = styled.input`
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
`

const WarningText = styled.div`
  color: rgb(243, 28, 0);
  font-size: 0.9rem;
  margin-top: 8px;
  margin-left: 4px;
`

const SuccessText = styled.div`
  color: rgb(0, 150, 75);
  font-size: 0.9rem;
  margin-top: 8px;
  margin-left: 4px;
`
