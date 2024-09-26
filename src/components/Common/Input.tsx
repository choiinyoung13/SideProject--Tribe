import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { emailRegex, passwordRegex } from '../../utill/checkInputValueValid'

interface InputType {
  type: 'text' | 'password'
  placeholder: string
  email?: string
  password?: string
  setEmail?: React.Dispatch<React.SetStateAction<string>>
  setIsIdValid?: React.Dispatch<React.SetStateAction<boolean>>
  setIsPasswordValid?: React.Dispatch<React.SetStateAction<boolean>>
  setPassword?: React.Dispatch<React.SetStateAction<string>>
  setConfirmPassword?: React.Dispatch<React.SetStateAction<string>>
  setIscheckRedundancyOpened?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Input({
  type,
  email,
  password,
  placeholder,
  setEmail,
  setIsIdValid,
  setPassword,
  setConfirmPassword,
  setIsPasswordValid,
  setIscheckRedundancyOpened,
}: InputType) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (setEmail) {
      setEmail(value)
    }

    if (setPassword) {
      setPassword(value)
    }

    if (setConfirmPassword) {
      setConfirmPassword(value)
    }

    if (setIsIdValid && email !== undefined) {
      setIsIdValid(emailRegex.test(value))
    }

    if (setIsPasswordValid && password !== undefined) {
      setIsPasswordValid(passwordRegex.test(value))
    }

    if (setIscheckRedundancyOpened && email !== undefined) {
      setIscheckRedundancyOpened(false)
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
