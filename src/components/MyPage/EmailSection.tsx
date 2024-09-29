import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useState } from 'react'
import {
  sendVerificationEmail,
  changeEmail,
} from '../../config/api/user/ChangeEmail'
import { emailRegex } from '../../utill/checkInputValueValid'

interface EmailSectionProps {
  userInfo: any
  isEmailEditMode: boolean
  setIsEmailEditMode: (value: boolean) => void
  setUserInfo: (userInfo: any) => void
}

export function EmailSection({
  userInfo,
  isEmailEditMode,
  setIsEmailEditMode,
  setUserInfo,
}: EmailSectionProps) {
  const [newEmail, setNewEmail] = useState<string>('')
  const [isVerified, setIsVerified] = useState(false)

  const sendVerificationCode = async () => {
    if (!newEmail) return

    if (newEmail === userInfo.email) {
      Swal.fire({
        text: '현재 사용중인 이메일 입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (!emailRegex.test(newEmail)) {
      Swal.fire({
        text: '유효한 이메일 형식이 아닙니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    // 서버로 이메일 인증 요청 (이메일로 인증번호 전송)
    const result = await sendVerificationEmail(newEmail)
    if (result.success) {
      Swal.fire({
        text: '인증 메일이 발송되었습니다. 메일함을 확인해주세요.',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      setIsVerified(true)
    } else {
      Swal.fire({
        text: '인증 메일 발송에 실패했습니다. 다시 시도해 주세요.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    }
  }

  const saveEmailChange = async () => {
    const result = await changeEmail(newEmail, userInfo.id)
    if (result.success) {
      Swal.fire({
        text: '이메일이 성공적으로 변경되었습니다.',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      setUserInfo({ ...userInfo, email: newEmail })
      setIsEmailEditMode(false)
    } else {
      Swal.fire({
        text: '이메일 변경 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    }
  }

  return (
    <Section>
      <SectionHeader>
        <Title>이메일</Title>
        <ButtonWrapper>
          {!isEmailEditMode && (
            <button
              onClick={() => {
                setNewEmail(userInfo.email)
                setIsEmailEditMode(true)
              }}
            >
              수정
            </button>
          )}
          {isEmailEditMode && (
            <EditButtonWrapper>
              {!isVerified ? (
                <button onClick={sendVerificationCode}>인증 메일 전송</button>
              ) : (
                <button onClick={saveEmailChange}>이메일 저장</button>
              )}
              <button
                onClick={() => {
                  setUserInfo({ ...userInfo })
                  setIsEmailEditMode(false)
                  setNewEmail('')
                }}
              >
                취소
              </button>
            </EditButtonWrapper>
          )}
        </ButtonWrapper>
      </SectionHeader>
      <SectionBody>
        <input
          type="email"
          draggable={false}
          disabled={!isEmailEditMode || isVerified}
          value={newEmail ? newEmail : userInfo.email}
          onChange={e => setNewEmail(e.target.value)}
          style={{ pointerEvents: isEmailEditMode ? 'auto' : 'none' }}
        />
        <Infomation>
          * 이메일 수정 후 인증 메일 전송을 누르면 해당 이메일로 인증 메일이
          발송됩니다. <br />* 이미 사용중인 이메일로 변경 불가능합니다.
          <br />* 이메일 변경 시 따로 설정한 닉네임이 없다면 이메일 @앞부분
          아이디로 닉네임이 변경됩니다.
        </Infomation>
      </SectionBody>
    </Section>
  )
}

const Section = styled.section`
  width: 100%;
`

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: rgb(0, 109, 235);
  }
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
      outline: 2px solid rgba(30, 30, 30, 1);
    }

    &:disabled {
      color: rgba(150, 150, 150, 1);
    }
  }

  @media (max-width: 768px) {
    input {
      font-size: 0.85rem;
    }
  }
`

const Infomation = styled.p`
  line-height: 28px;
  margin-top: 10px;
  color: rgba(120, 120, 120, 1);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(50, 50, 50, 1);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const ButtonWrapper = styled.div``

const EditButtonWrapper = styled.div``
