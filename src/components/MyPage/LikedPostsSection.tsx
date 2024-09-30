import styled from 'styled-components'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { IoMdHeart } from 'react-icons/io'

interface LikedPostsSectionProps {
  likedPosts: any[]
}

export function LikedPostsSection({ likedPosts }: LikedPostsSectionProps) {
  return (
    <Section>
      <ContentWrapper>
        <section>
          {likedPosts && likedPosts.length > 0 ? (
            likedPosts.map((post, index) => (
              <Card key={index}>
                <CardImage>
                  <img src={post.img_urls[0]} alt={post.title} />
                </CardImage>
                <CardContent>
                  <h3>
                    <Category>[{post.category}]</Category>
                    {post.title}
                  </h3>
                  <p>{post.content}</p>
                  <PostInfo>
                    <Liked>
                      <IoMdHeart />
                      <span>{post.liked.length}개</span>
                    </Liked>
                    <Comment>
                      <IoChatbubbleEllipsesOutline />
                      <span>{post.comments?.length || 0}개</span>
                    </Comment>
                  </PostInfo>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>좋아요를 누른 게시물이 없습니다.</p>
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
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
`

const Card = styled.div`
  width: calc(25% - 15px);
  background-color: #f8f9fa;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  text-align: left;
  color: #333;
  box-sizing: border-box;

  h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(50, 50, 50, 1);
  }

  p {
    margin: 11px 0;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1024px) {
    width: calc(33.33% - 15px);
  }

  @media (max-width: 768px) {
    width: calc(50.65% - 15px);
  }

  @media (max-width: 600px) {
    width: calc(50.85% - 15px);
  }
`

const CardImage = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  margin-bottom: 10px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`

const Category = styled.span`
  font-weight: 400;
  font-size: 0.95rem;
  color: rgba(100, 100, 100, 1);
  margin-right: 4px;
`

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: #888;

  span {
    display: block;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`

const Liked = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  svg {
    color: rgb(253, 70, 108);
    font-size: 0.9rem;
    margin-top: 5px;
    margin-right: 3px;
  }
`
const Comment = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: rgb(30, 30, 30);
    font-size: 0.9rem;
    margin-top: 5px;
    margin-right: 3px;
  }
`
