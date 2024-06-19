import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface ButtonSectionProps {
  isDateSelected: boolean
}

export default function ButtonSection({ isDateSelected }: ButtonSectionProps) {
  const navigate = useNavigate()

  return (
    <ButtonCon>
      {isDateSelected ? (
        <ButtonOption2>
          <button
            type="button"
            onClick={() => {
              alert('구매해주셔서 감사합니다')
              navigate('/shop')
            }}
          >
            바로 구매
          </button>
          <button type="button">장바구니에 담기</button>
        </ButtonOption2>
      ) : (
        <ButtonOption1>
          <button type="button">수령일을 선택해주세요</button>
        </ButtonOption1>
      )}
    </ButtonCon>
  )
}

const ButtonCon = styled.div`
  margin-top: 30px;
  width: 100%;
`

const ButtonOption1 = styled.div`
  button {
    cursor: pointer;
    width: 100%;
    background-color: rgba(30, 30, 30, 1);
    border: none;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 12px 0px;

    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`

const ButtonOption2 = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    cursor: pointer;
    width: 100%;
    border: none;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 12px 0px;

    &:first-of-type {
      background-color: #fff;
      color: rgba(30, 30, 30, 1);
      border: 1px solid rgba(190, 190, 190, 1);
      width: 49%;
    }

    &:last-of-type {
      background-color: rgba(30, 30, 30, 1);
      color: #fff;
      width: 49%;
    }

    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`
