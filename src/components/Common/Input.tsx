import { ChangeEvent } from 'react'
import styled from 'styled-components'

interface InputType {
  type: 'text' | 'password'
  placeholder: string
  otp?: string
  setOtp?: React.Dispatch<React.SetStateAction<string>>
}

export default function Input({
  type,
  placeholder,

  setOtp,
}: InputType) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (setOtp) {
      setOtp(value)
    }
  }

  return (
    <FormInput
      autoComplete="off"
      type={type}
      placeholder={placeholder}
      maxLength={30}
      onChange={handleOnChange}
    />
  )
}

const FormInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;

  @media (max-width: 1450px) {
    width: 300px;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`
