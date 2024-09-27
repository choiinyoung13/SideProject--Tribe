import styled from 'styled-components'

interface NicknameSectionProps {
  userInfo: any
  isNicknameEditMode: boolean
  setIsNicknameEditMode: (value: boolean) => void
  initialNickname: string
  setUserInfo: (userInfo: any) => void
}

export function NicknameSection({
  userInfo,
  isNicknameEditMode,
  setIsNicknameEditMode,
  initialNickname,
  setUserInfo,
}: NicknameSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <Title>닉네임</Title>
        <ButtonWrapper>
          {!isNicknameEditMode && (
            <button onClick={() => setIsNicknameEditMode(true)}>수정</button>
          )}
          {isNicknameEditMode && (
            <EditButtonWrapper>
              <button onClick={() => setIsNicknameEditMode(false)}>저장</button>
              <button
                onClick={() => {
                  setUserInfo({ ...userInfo, nickname: initialNickname })
                  setIsNicknameEditMode(false)
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
          disabled={!isNicknameEditMode}
          type="text"
          value={userInfo.nickname || userInfo.email.split('@')[0]}
          onChange={e => {
            if (isNicknameEditMode) {
              setUserInfo({ ...userInfo, nickname: e.target.value })
            }
          }}
          style={{ pointerEvents: isNicknameEditMode ? 'auto' : 'none' }}
        />
        <Infomation>
          * 닉네임은 변경 후 30일이 지나야 다시 바꿀 수 있습니다. <br />*
          한글/영문/숫자만 사용할 수 있으며, 특수문자는 사용할 수 없습니다.{' '}
          <br />
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
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(50, 50, 50, 1);
`

const ButtonWrapper = styled.div``

const EditButtonWrapper = styled.div``
