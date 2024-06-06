import styled from 'styled-components'

interface InputType {
  type: 'text' | 'password'
  placeholder: string
}

export default function Input({ type, placeholder }: InputType) {
  return <FormInput type={type} placeholder={placeholder} />
}

const FormInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
`
