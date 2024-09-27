import styled from 'styled-components'
import Input from '../../components/Common/Input'
import {
  sendVerificationEmail,
  verifyOtpCode,
} from '../../config/api/user/ChangeEmail'
import { checkEmailExists } from '../../utill/checkEmailExists'
import { useEffect, useState } from 'react'
import { emailRegex } from '../../utill/checkInputValueValid'

interface EmailSectionProps {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  isEmailValid: boolean
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>
  isEmailExists: boolean
  setIsEmailExists: React.Dispatch<React.SetStateAction<boolean>>
  isOtpEmailSent: boolean
  setIsOtpEmailSent: React.Dispatch<React.SetStateAction<boolean>>
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
  isOtpValid: boolean
  setIsOtpValid: React.Dispatch<React.SetStateAction<boolean>>
  ischeckRedundancyOpened: boolean
  setIscheckRedundancyOpened: React.Dispatch<React.SetStateAction<boolean>>
}

// 이메일 입력 섹션
export default function EmailSection({
  email,
  setEmail,
  isEmailValid,
  setIsEmailValid,
  isEmailExists,
  setIsEmailExists,
  isOtpEmailSent,
  setIsOtpEmailSent,
  otp,
  setOtp,
  setIsOtpValid,
  setIscheckRedundancyOpened,
}: EmailSectionProps) {
  const [warningText, setWarningText] = useState<string>('')
  const [successText, setSuccessText] = useState<string>('')

  useEffect(() => {
    const result = emailRegex.test(email)
    setWarningText('')
    setSuccessText('')

    if (email.length > 0 && !result) {
      setWarningText('유효한 이메일 형식이 아닙니다')
    }

    if (email.length > 0 && result) {
      setSuccessText('사용 가능한 이메일입니다')
    }
  }, [email])

  return (
    <EmailSectionCon>
      {/* 이메일 입력 및 중복 확인 */}
      <IdInputCon>
        <EmailInput
          type="text"
          placeholder="사용하실 이메일을 입력해주세요."
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <button
          disabled={!(email.length > 0 && emailRegex.test(email) === true)}
          type="button"
          onClick={async () => {
            if (isEmailValid && email.length > 0) {
              setIscheckRedundancyOpened(true)
              const result = await checkEmailExists(email)
              setIsEmailExists(result)

              // 인증코드 입력한 이메일로 보내기
              const res = await sendVerificationEmail(email)
              setIsOtpEmailSent(res.success)
            }
          }}
        >
          중복확인
        </button>
      </IdInputCon>

      {/* 인증번호 입력 섹션 */}
      {isOtpEmailSent && (
        <IdInputCon>
          <Input
            type="text"
            placeholder="인증번호 6자리를 입력해주세요"
            setOtp={setOtp}
            otp={otp}
          />
          <button
            type="button"
            onClick={async () => {
              const result = await verifyOtpCode(email, otp)
              setIsOtpValid(result.success)
            }}
          >
            제출
          </button>
        </IdInputCon>
      )}

      {email.length > 0 && warningText && (
        <WarningText>{warningText}</WarningText>
      )}
      {email.length > 0 && successText && (
        <SuccessText>{successText}</SuccessText>
      )}
    </EmailSectionCon>
  )
}

const EmailSectionCon = styled.div``

const IdInputCon = styled.div`
  width: 100%;
  display: flex;

  input {
    flex: 1 0 0;
  }

  button {
    height: 100%;
    font-size: 0.9rem;
    font-weight: 300;
    padding: 12px;
    margin-left: 4px;
    background-color: rgba(30, 30, 30, 1);
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: rgba(50, 50, 50, 1);
    }

    &:disabled {
      background-color: rgba(150, 150, 150, 1);
      cursor: not-allowed;
    }
  }

  @media (max-width: 600px) {
    width: 80%;
    display: flex;
    margin: 0 auto;
    align-item: center;

    input {
      flex: 1 0 0;
    }

    button {
      font-size: 0.8rem;
      padding: 10px 12px;
      margin-left: 6px;
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

  @media (max-width: 1450px) {
    width: 300px;
  }

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
