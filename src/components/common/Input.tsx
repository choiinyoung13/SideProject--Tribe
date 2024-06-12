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

  @media (max-width: 414px) {
    font-size: 0.8rem;
    width: 80%;
    margin: 0 auto 14px;
  }
`
