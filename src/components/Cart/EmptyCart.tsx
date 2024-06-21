import styled from 'styled-components'

export default function EmptyCart() {
  return (
    <EmptyCartCon>
      <Text>장바구니가 비어 있습니다</Text>
    </EmptyCartCon>
  )
}

const EmptyCartCon = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid rgba(90, 90, 90, 1);
  border-top: 3px solid rgba(30, 30, 30, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`
const Text = styled.div`
  font-size: 2rem;
  font-weight: 600;
`
