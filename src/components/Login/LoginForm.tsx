import { useState } from 'react'
import styled from 'styled-components'
import { validateLoginForm } from '../../utill/validationHelpers'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  errorMessage?: string
  isLoading?: boolean
}

/**
 * 로그인 폼 컴포넌트 - 폼 로직과 UI를 분리
 */
export const LoginForm = ({
  onSubmit,
  errorMessage,
  isLoading = false,
}: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    // 폼 유효성 검사
    const validation = validateLoginForm(email, password)
    if (!validation.isValid) {
      setValidationError(validation.error)
      return
    }

    await onSubmit(email, password)
  }

  const displayError = validationError || errorMessage

  return (
    <Form onSubmit={handleSubmit}>
      <EmailInput
        type="text"
        placeholder="가입한 이메일을 입력해주세요."
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <PasswordInput
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={isLoading}
      />
      {displayError && <ErrorMessage>{displayError}</ErrorMessage>}
      <LoginBtn type="submit" disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </LoginBtn>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const EmailInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;
  margin-bottom: 8px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 85%;
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`

const PasswordInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;
  margin-bottom: 8px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 85%;
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`

const ErrorMessage = styled.p`
  color: rgb(243, 28, 0);
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
`

const LoginBtn = styled.button`
  color: #fff;
  background-color: rgba(20, 20, 20, 1);
  padding: 12px 30px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  margin-bottom: 10px;

  &:hover:not(:disabled) {
    background-color: rgba(30, 30, 30, 1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 85%;
    margin: 0 auto 14px;
  }
`
