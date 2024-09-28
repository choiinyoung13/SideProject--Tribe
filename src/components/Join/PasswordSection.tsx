import styled from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { passwordRegex } from '../../utill/checkInputValueValid'

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
    '비밀번호는 영문자, 숫자, 특수문자를 포함한 6~20자이어야 합니다'
  )

  useEffect(() => {
    const result = passwordRegex.test(password)
    setWarningText('')
    setSuccessText('')
    setIsPasswordValid(false)
    setIsPasswordValid(false)

    if (password && confirmPassword && password !== confirmPassword) {
      setWarningText('비밀번호가 일치하지 않습니다')
      setIsConfirmPasswordValid(false)
    }

    if (password && result) {
      setSuccessText('사용가능한 비밀번호입니다')
      setIsPasswordValid(true)
    }

    if (password && !result) {
      setWarningText('유효하지 않은 비밀번호 형식입니다')
    }
  }, [password])

  useEffect(() => {
    setWarningText('')
    setSuccessText('')
    setIsPasswordValid(false)

    const result = passwordRegex.test(password)
    if (password && result) {
      setSuccessText('사용가능한 비밀번호입니다')
      setIsPasswordValid(true)
    }

    if (password && !result) {
      setWarningText('유효하지 않은 비밀번호 형식입니다')
    }

    if (confirmPassword && password !== confirmPassword) {
      setWarningText('비밀번호가 일치하지 않습니다')
      setIsConfirmPasswordValid(false)
    }

    if (confirmPassword && password === confirmPassword) {
      setSuccessText('비밀번호가 일치합니다')
      setIsConfirmPasswordValid(true)
    }
  }, [confirmPassword])

  return (
    <>
      {/* 비밀번호 입력 */}
      <PasswordInputCon>
        <PasswordInput
          disabled={disabled}
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </PasswordInputCon>

      {/* 비밀번호 확인 입력 */}
      <InputWrapper>
        <PasswordConfirmInput
          disabled={disabled}
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value)
          }}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="비밀번호 확인을 위해 다시 입력해주세요."
        />
        {/* 눈 모양 아이콘 */}
        <EyeIcon onClick={() => setIsPasswordVisible(prev => !prev)}>
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </EyeIcon>
      </InputWrapper>

      {/* 조건에 따른 메시지 출력 */}
      {password.length === 0 && confirmPassword.length === 0 && (
        <InfoText>{infoText}</InfoText>
      )}

      {password.length === 0 && confirmPassword.length > 0 && (
        <InfoText>{infoText}</InfoText>
      )}

      {password.length > 0 && successText && !warningText && (
        <SuccessText>{successText}</SuccessText>
      )}
      {password.length > 0 && warningText && (
        <WarningText>{warningText}</WarningText>
      )}
    </>
  )
}

const PasswordInputCon = styled.div`
  width: 100%;
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
  }

  @media (max-width: 600px) {
    display: flex;
  }
`

const EyeIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 60%;
  transform: translateY(-70%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #000;

  @media (max-width: 600px) {
    top: 50%;
    right: 14px;
  }
`

const PasswordInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;
  margin-top: 20px;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 7px;
  }
`

const PasswordConfirmInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;
  margin-top: 8px;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`

const InfoText = styled.span`
  color: rgba(60, 60, 60, 1);
  font-size: 0.85rem;
  font-weight: 500;
  margin: 12px 0 35px 4px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 0 35px 4px;
  }
`

const SuccessText = styled.span`
  color: rgb(0, 150, 75);
  font-size: 0.85rem;
  margin: 12px 0 35px 4px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`

const WarningText = styled.span`
  color: rgb(243, 28, 0);
  font-size: 0.85rem;
  margin: 12px 0 35px 4px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`
