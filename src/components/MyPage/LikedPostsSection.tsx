import styled from 'styled-components'
import { Card } from './Card'

interface LikedPostsSectionProps {
  likedPosts: any[]
}

export function LikedPostsSection({ likedPosts }: LikedPostsSectionProps) {
  return (
    <Section>
      <ContentWrapper>
        <section>
          {likedPosts && likedPosts.length > 0 ? (
            likedPosts.map((post, index) => <Card key={index} post={post} />)
          ) : (
            <Empty>
              <p>좋아요를 누른 게시물이 없습니다.</p>
            </Empty>
          )}
        </section>
      </ContentWrapper>
    </Section>
  )
}

const Section = styled.div`
  width: 100%;
  padding: 20px 0 0;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;

  section {
    width: 100%;
    min-height: 565px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  @media (max-width: 1150px) {
    section {
      padding: 0 30px 0 35px;
    }
  }
`
const Empty = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
  }

  @media (max-width: 600px) {
    p {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 400px) {
    p {
      font-size: 1.1rem;
    }
  }
`
