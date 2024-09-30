import styled from 'styled-components'

interface PurchaseHistoryProps {
  purchaseHistory: any[]
}

export function PurchaseHistorySection({
  purchaseHistory,
}: PurchaseHistoryProps) {
  return (
    <Section>
      <Title>구매 내역</Title>
      <ContentWrapper>
        {purchaseHistory && purchaseHistory.length > 0 ? (
          purchaseHistory.map((item, index) => (
            <Card key={index}>
              <p>{item.title}</p>
            </Card>
          ))
        ) : (
          <p>구매 내역이 없습니다.</p>
        )}
      </ContentWrapper>
    </Section>
  )
}

const Section = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 4px;
  margin-bottom: 20px;
  color: #222;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Card = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  color: #333;
`
