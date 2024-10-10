import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { statusMessageRegex } from '../../utill/checkInputValueValid'
import { ChangeStatusMessage } from '../../config/api/user/ChangeStatusMessage'

interface StatusMessageSectionProps {
  userInfo: any
  isStatusMessageEditMode: boolean
  setIsStatusMessageEditMode: (value: boolean) => void
  setUserInfo: (userInfo: any) => void
}

export function StatusMessageSection({
  userInfo,
  isStatusMessageEditMode,
  setIsStatusMessageEditMode,
  setUserInfo,
}: StatusMessageSectionProps) {
  const [initialStatusMessage, setInitialStatusMessage] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (!userInfo) return
    setInitialStatusMessage(
      !userInfo.status_message ? '' : userInfo.status_message
    )
    setInputValue(!userInfo.status_message ? '' : userInfo.status_message)
  }, [userInfo])

  // 상태메세지 저장 로직
  const onSave = async (newMessage: string, id: string) => {
    if (!inputValue || !inputValue.trim()) {
      Swal.fire({
        text: '상태 메세지란을 채워 주세요',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    // 상태메세지 유효성 검사
    if (!statusMessageRegex.test(inputValue)) {
      Swal.fire({
        text: '유효하지 않은 상태메세지 형식입니다',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    // 기존 상태메세지와 같으면 종료
    if (initialStatusMessage === inputValue) {
      Swal.fire({
        text: '이전과 같은 상태메세지입니다',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    // 변경 요청을 보내기전 메세지 앞 공백 전부 제거
    const noPreTrimInputValue = inputValue.replace(/^\s+/, '')
    const result = await ChangeStatusMessage(noPreTrimInputValue, id)

    // 상태메세지 변경이 성공하면 상태 업데이트
    if (result.success) {
      // 변경 요청을 보내기전 메세지 앞 공백 전부 제거
      const noPreTrimNewMessage = newMessage.replace(/^\s+/, '')
      setUserInfo((prev: any) => ({
        ...prev,
        status_message: noPreTrimNewMessage,
      }))
      setIsStatusMessageEditMode(false)

      Swal.fire({
        text: '상태메세지가 성공적으로 변경되었습니다',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    }
  }

  return (
    <Section>
      <SectionHeader>
        <Title>상태메세지</Title>
        <ButtonWrapper>
          {!isStatusMessageEditMode && (
            <button onClick={() => setIsStatusMessageEditMode(true)}>
              수정
            </button>
          )}
          {isStatusMessageEditMode && (
            <EditButtonWrapper>
              <button
                onClick={() => {
                  onSave(inputValue, userInfo.id)
                }}
              >
                저장
              </button>
              <button
                onClick={() => {
                  setInputValue(initialStatusMessage) // 원래 상태메세지로 복구
                  setIsStatusMessageEditMode(false)
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
          draggable={false}
          disabled={!isStatusMessageEditMode}
          type="text"
          value={inputValue}
          onChange={e => {
            if (isStatusMessageEditMode) {
              setInputValue(e.target.value)
            }
          }}
          style={{ pointerEvents: isStatusMessageEditMode ? 'auto' : 'none' }}
        />
        <Infomation>
          * 상태메세지를 등록해서 본인의 정보를 다른 이웃들에게 설명해주세요.{' '}
          <br />* 한글/영문/숫자/특수문자만 사용할 수 있습니다.
        </Infomation>
      </SectionBody>
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
