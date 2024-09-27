import styled from 'styled-components'
import { FaChevronDown } from 'react-icons/fa'

interface AccountDeletionSectionProps {
  selectedReason: string
  setSelectedReason: (value: string) => void
  isDeletionButtonDisabled: boolean
}

export function AccountDeletionSection({
  selectedReason,
  setSelectedReason,
  isDeletionButtonDisabled,
}: AccountDeletionSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <Title>회원 탈퇴</Title>
      </SectionHeader>
      <SectionBody>
        <CustomSelectWrapper>
          <AccountDeletionSelect
            onChange={e => setSelectedReason(e.target.value)}
          >
            <option value="" disabled hidden selected>
              Trib를 떠나는 이유를 알려주세요
            </option>
            <option value="더이상 사용하지 않아요">
              더이상 사용하지 않아요
            </option>
            <option value="대체할 만한 서비스를 찾았어요">
              대체할 만한 서비스를 찾았어요
            </option>
            <option value="쿠폰 · 적립금 등 혜택이 적어요">
              쿠폰 · 적립금 등 혜택이 적어요
            </option>
            <option value="원하는 제품이 없어요">원하는 제품이 없어요</option>
            <option value="기타">기타</option>
          </AccountDeletionSelect>
          <SelectArrow>
            <FaChevronDown />
          </SelectArrow>
        </CustomSelectWrapper>
      </SectionBody>
      <SectionFooter>
        <button disabled={isDeletionButtonDisabled}>회원 탈퇴</button>
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
  width: 100%;
`

const CustomSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

const AccountDeletionSelect = styled.select`
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 10px;
  font-size: 1rem;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 6px;
`

const SelectArrow = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1rem;
  color: rgba(120, 120, 120, 1);
`

const SectionFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
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
