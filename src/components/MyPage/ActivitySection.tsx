import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchLikedPosts } from '../../config/api/post/fecthPosts'

export default function ActivitySection() {
  //   const { data: likedPost, isLoading: likedPostLoading } = useQuery(
  //     ['Posts', 'liked'],
  //     fetchLikedPosts,
  //     {
  //       staleTime: 0,
  //       cacheTime: 30 * 60 * 1000,
  //     }
  //   )

  return (
    <Container>
      <Section>
        <Title>좋아요 누른 게시물</Title>
        <ContentWrapper>
          <Card>
            <p>게시물 1</p>
          </Card>
          <Card>
            <p>게시물 2</p>
          </Card>
          <Card>
            <p>게시물 3</p>
          </Card>
        </ContentWrapper>
      </Section>

      <Section>
        <Title>내가 올린 게시물</Title>
        <ContentWrapper>
          <Card>
            <p>게시물 1</p>
          </Card>
          <Card>
            <p>게시물 2</p>
          </Card>
        </ContentWrapper>
      </Section>

      <Section>
        <Title>구매 내역</Title>
        <ContentWrapper>
          <Card>
            <p>구매 내역 1</p>
          </Card>
          <Card>
            <p>구매 내역 2</p>
          </Card>
        </ContentWrapper>
      </Section>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 0px 50px;
  margin: 0 auto;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 0px 30px;
  }
`

const Section = styled.div`
  width: 100%;
  margin-bottom: 40px;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;

  &:first-of-type {
    padding: 0 0 20px 0;
  }
`

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #222;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Card = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  text-align: left;
  color: #333;

  p {
    margin: 0;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 15px;
    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 600px) {
    padding: 10px;
    p {
      font-size: 0.8rem;
    }
  }
`
