import styled from 'styled-components'
import { GrFormPrevious } from 'react-icons/gr'
import { GrFormNext } from 'react-icons/gr'

export default function PageNation() {
  return (
    <PageNationCon>
      <PageNationWrapper>
        <PrevButton disabled>
          <GrFormPrevious />
        </PrevButton>
        <PageNumberCon>
          <PageNumber className="selected">1</PageNumber>
          <PageNumber>2</PageNumber>
          <PageNumber>3</PageNumber>
          <PageNumber>4</PageNumber>
          <PageNumber>5</PageNumber>
          <PageNumber>6</PageNumber>
        </PageNumberCon>
        <NextButton>
          <GrFormNext />
        </NextButton>
      </PageNationWrapper>
    </PageNationCon>
  )
}

const PageNationCon = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`

const PageNationWrapper = styled.div`
  width: 22%;
  min-width: 380px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    font-size: 1.6rem;
    cursor: pointer;
    padding-top: 5px;
  }
`
const PrevButton = styled.button``

const NextButton = styled.button``

const PageNumberCon = styled.ul`
  width: 70%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PageNumber = styled.li`
  cursor: pointer;

  &.selected {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(30, 30, 30, 1);
    color: #fff;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    padding-bottom: 2px;
    margin-top: 3px;
  }
`
