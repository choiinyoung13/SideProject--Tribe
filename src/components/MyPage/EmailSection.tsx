import styled from 'styled-components'

interface EmailSectionProps {
  userInfo: any
  isEmailEditMode: boolean
  setIsEmailEditMode: (value: boolean) => void
  initialEmail: string
  setUserInfo: (userInfo: any) => void
}

export function EmailSection({
  userInfo,
  isEmailEditMode,
  setIsEmailEditMode,
  initialEmail,
  setUserInfo,
}: EmailSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <Title>이메일</Title>
        <ButtonWrapper>
          {!isEmailEditMode && (
            <button onClick={() => setIsEmailEditMode(true)}>수정</button>
          )}
          {isEmailEditMode && (
            <EditButtonWrapper>
              <button onClick={() => setIsEmailEditMode(false)}>
                인증번호 요청
              </button>
              <button
                onClick={() => {
                  setUserInfo({ ...userInfo, email: initialEmail })
                  setIsEmailEditMode(false)
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
          disabled={!isEmailEditMode}
          value={userInfo.email}
          onChange={e => {
            if (isEmailEditMode) {
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          }}
          style={{ pointerEvents: isEmailEditMode ? 'auto' : 'none' }}
        />
        <Infomation>
          * 이메일 수정 후 인증번호 요청을 누르면 해당 이메일로 인증번호가
          전송됩니다. <br />* 이미 사용중인 이메일로 변경 불가능합니다.
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
      outline: 1px solid rgba(230, 230, 230, 1);
    }

    &:disabled {
      color: rgba(150, 150, 150, 1);
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
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(50, 50, 50, 1);
`

const ButtonWrapper = styled.div``

const EditButtonWrapper = styled.div``
