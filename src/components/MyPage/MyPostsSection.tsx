import styled from 'styled-components'

interface MyPostsSectionProps {
  myPosts: any[]
}

export function MyPostsSection({ myPosts }: MyPostsSectionProps) {
  return (
    <Section>
      <Title>내가 올린 게시물</Title>
      <ContentWrapper>
        {myPosts && myPosts.length > 0 ? (
          myPosts.map((post, index) => (
            <Card key={index}>
              <p>{post.title}</p>
            </Card>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
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
