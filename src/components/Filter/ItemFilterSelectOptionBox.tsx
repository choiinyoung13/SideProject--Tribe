import { useRef } from 'react'
import styled from 'styled-components'

interface SelectOptionBoxPropsType {
  type: '사이즈' | '가격' | '컬러'
}

function getDataByType(type: string) {
  if (type === '사이즈') {
    return [
      { title: 'Small', checked: false },
      { title: 'Medium', checked: false },
      { title: 'Large', checked: false },
      { title: 'X-Large', checked: false },
      { title: '2X-Large', checked: false },
    ]
  } else if (type === '가격') {
    return [
      { title: '5만원 이하', checked: false },
      { title: '5만원 ~ 10만원 사이', checked: false },
      { title: '10만원 이상', checked: false },
    ]
  } else if (type === '컬러') {
    return [
      { title: '빨강 계열', checked: false },
      { title: '보라 계열', checked: false },
      { title: '흰색 계열', checked: false },
      { title: '노랑 계열', checked: false },
      { title: '블랙 계열', checked: false },
      { title: '초록 계열', checked: false },
      { title: '파랑 계열', checked: false },
      { title: '파스텔 계열', checked: false },
      { title: '빈티지 계열', checked: false },
      { title: '혼합 컬러', checked: false },
    ]
  }
}

export default function SelectOptionBox({ type }: SelectOptionBoxPropsType) {
  const sizeDatas = useRef(getDataByType(type))

  interface DataType {
    title: string
    checked: boolean
  }

  if (sizeDatas.current === undefined) return null

  return (
    <div>
      {sizeDatas.current.map((data: DataType, i: number) => {
        return (
          <CheckInputCon key={i}>
            <input type="radio" id={String(i) + data.title} name={type} />
            <Label htmlFor={String(i) + data.title}>{data.title}</Label>
          </CheckInputCon>
        )
      })}
    </div>
  )
}

const CheckInputCon = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 300;
  margin-left: 5px;
  color: rgba(40, 40, 40, 1);
`
