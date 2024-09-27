import styled from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Input from '../../components/Common/Input'

interface PasswordSectionProps {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
  isPasswordVisible: boolean
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>
  isPasswordValid: boolean
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
  isConfirmPasswordValid: boolean
}

// 비밀번호 입력 섹션
export default function PasswordSection({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isPasswordVisible,
  setIsPasswordVisible,
  isPasswordValid,
  setIsPasswordValid,
  isConfirmPasswordValid,
}: PasswordSectionProps) {
  return (
    <>
      {/* 비밀번호 입력 */}
      <PasswordInputCon>
        <PasswordInput
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

      {/* 비밀번호 일치 여부 메시지 */}
      {password &&
        isPasswordValid &&
        confirmPassword &&
        !isConfirmPasswordValid && (
          <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
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
    input {
      width: 80%;
    }
  }
`

const EyeIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-70%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #000;

  @media (max-width: 600px) {
    right: 60px;
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

  @media (max-width: 1450px) {
    width: 300px;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 14px;
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

  @media (max-width: 1450px) {
    width: 300px;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`

const WarningText = styled.span`
  color: red;
  font-size: 0.9rem;
  margin: 6px 0 35px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`
