import styled from 'styled-components'

interface InputType {
  type: 'text' | 'password'
  placeholder: string
}

export default function Input({ type, placeholder }: InputType) {
  return (
    <FormInput
      autoComplete="off"
      type={type}
      placeholder={placeholder}
      maxLength={30}
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
