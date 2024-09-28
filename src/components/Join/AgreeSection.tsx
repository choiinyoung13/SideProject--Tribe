import styled from 'styled-components'

interface AgreeSectionProps {
  isRequiredChecked: boolean
  setIsRequiredChecked: React.Dispatch<React.SetStateAction<boolean>>
  disabled: boolean
}

// 필수 약관 동의 섹션
export default function AgreeSection({
  isRequiredChecked,
  setIsRequiredChecked,
  disabled,
}: AgreeSectionProps) {
  return (
    <Container>
      {/* 필수 동의 */}
      <AgreeCon>
        <AgreeWrapper disabled={disabled}>
          <input
            type="checkbox"
            checked={isRequiredChecked}
            onChange={e => setIsRequiredChecked(e.target.checked)}
            disabled={disabled}
          />
          <label>
            <span>[필수]</span> 서비스 이용 관련 약관에 모두 동의합니다.
          </label>
        </AgreeWrapper>
      </AgreeCon>

      {/* 선택 동의 */}
      <AgreeCon>
        <AgreeWrapper disabled={disabled}>
          <input type="checkbox" disabled={disabled} />
          <label>[선택]광고성 정보 수신에 모두 동의합니다.</label>
        </AgreeWrapper>
      </AgreeCon>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  border-top: 1px solid rgba(150, 150, 150, 1);
  padding-top: 24px;

  @media (max-width: 600px) {
    margin-top: 20px;
    padding-top: 20px;
  }
`

const AgreeCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;

  svg {
    margin-top: 10px;
  }

  &:last-of-type {
    margin-top: 16px;
  }
`

interface AgreeWrapperProps {
  disabled: boolean
}

const AgreeWrapper = styled.div<AgreeWrapperProps>`
  input {
    margin: 10px 10px 0 0;
  }

  label {
    font-size: 0.9rem;
    opacity: ${props => (props.disabled ? '0.7' : '1')};

    span {
      color: red;
    }
  }

  @media (max-width: 600px) {
    display: flex;

    input {
      width: 10px;
      margin: 0 14px 0 0;
    }

    label {
      font-size: 0.8rem;
    }
  }
`
