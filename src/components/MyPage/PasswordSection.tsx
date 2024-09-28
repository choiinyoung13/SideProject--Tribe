import styled from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { changePassword } from '../../config/api/user/ChangePassword'
import Swal from 'sweetalert2'

interface PasswordSectionProps {
  userInfo: any
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

    // 여기에 비밀번호 변경 API 호출 로직을 추가합니다.
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
    <Section>
      <SectionHeader>
        <Title>비밀번호 변경</Title>
      </SectionHeader>
      <SectionBody>
        {/* 기존 비밀번호 입력 필드 */}
        <InputWrapper>
          <input
            type={'password'}
            placeholder="기존 비밀번호를 입력해주세요."
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
        </InputWrapper>

        {/* 새로운 비밀번호 입력 필드 */}
        <InputWrapper>
          <input
            type={'password'}
            placeholder="새로운 비밀번호를 입력해주세요."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputWrapper>

        {/* 비밀번호 확인 입력 필드 */}
        <InputWrapper>
          <input
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호 확인을 위해 다시 입력해주세요."
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <EyeIcon
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            {isConfirmPasswordVisible ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </EyeIcon>
        </InputWrapper>

        {/* 경고 메시지 출력 */}
        {warningText && <WarningText>{warningText}</WarningText>}
      </SectionBody>
      <SectionFooter>
        <button
          disabled={!isPasswordValid || !isConfirmPasswordValid}
          onClick={onPasswordChange} // 비밀번호 변경 버튼에 핸들러 연결
        >
          비밀번호 변경
        </button>
      </SectionFooter>
    </Section>
  )
}

// 스타일링
const Section = styled.section`
  width: 100%;
`

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const SectionBody = styled.div`
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: rgb(245, 245, 245);
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 6px;

    &:focus {
      outline: 1px solid rgba(230, 230, 230, 1);
    }

    &:disabled {
      color: rgba(150, 150, 150, 1);
    }
  }
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  input {
    width: 100%;
    padding-right: 40px;
  }

  &:first-of-type {
    margin-top: 14px;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }
`

const EyeIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #000;
`

const WarningText = styled.div`
  color: red;
  font-size: 0.9rem;
  margin: 14px 0 0 8px;
`

const SectionFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    transition: background-color 0.3s ease;
    background-color: rgb(30, 30, 30, 1);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: 16px;

    &:hover {
      background-color: rgb(50, 50, 50, 1);
    }

    &:disabled {
      background-color: rgba(150, 150, 150, 1);
      cursor: not-allowed;
    }
  }
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(50, 50, 50, 1);
`
