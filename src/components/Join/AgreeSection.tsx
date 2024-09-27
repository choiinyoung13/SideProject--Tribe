import styled from 'styled-components'
import { AiOutlinePlus } from 'react-icons/ai'

interface AgreeSectionProps {
  isRequiredChecked: boolean
  setIsRequiredChecked: React.Dispatch<React.SetStateAction<boolean>>
}

// 필수 약관 동의 섹션
export default function AgreeSection({
  isRequiredChecked,
  setIsRequiredChecked,
}: AgreeSectionProps) {
  return (
    <>
      {/* 필수 동의 */}
      <AgreeCon>
        <AgreeWrapper>
          <input
            type="checkbox"
            checked={isRequiredChecked}
            onChange={e => setIsRequiredChecked(e.target.checked)}
          />
          <label>[필수]만 14세 이상이며 모두 동의합니다.</label>
        </AgreeWrapper>
        <AiOutlinePlus />
      </AgreeCon>

      {/* 선택 동의 */}
      <AgreeCon>
        <AgreeWrapper>
          <input type="checkbox" />
          <label>[선택]광고성 정보 수신에 모두 동의합니다.</label>
        </AgreeWrapper>
        <AiOutlinePlus />
      </AgreeCon>
    </>
  )
}

const AgreeCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;

  @media (max-width: 600px) {
    width: 80%;
    margin: 10px auto;
  }
`

const AgreeWrapper = styled.div`
  input {
    margin: 10px 10px 0 0;
  }

  label {
    font-size: 1rem;
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
