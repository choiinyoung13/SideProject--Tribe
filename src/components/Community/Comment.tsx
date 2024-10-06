import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

// dayjs 상대 시간 플러그인과 한국어 설정
dayjs.extend(relativeTime)
dayjs.locale('ko')

interface CommentProps {
  comment: {
    id: string
    user: string
    text: string
    timestamp: string
    profileUrl?: string
    username?: string
    email?: string
  }
}

export default function Comment({ comment }: CommentProps) {
  return (
    <CommentCon>
      <CommentLeft>
        <CommentProfileImage
          src={
            comment.profileUrl
              ? comment.profileUrl
              : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
          }
          alt="Comment Profile"
        />
        <CommentLeftText>
          <CommentUser>
            {comment.username ? comment.username : comment.email?.split('@')[0]}
          </CommentUser>
          <CommentText>{comment.text}</CommentText>
        </CommentLeftText>
      </CommentLeft>
      <CommentTime>{dayjs(comment.timestamp).fromNow()}</CommentTime>
    </CommentCon>
  )
}

const CommentCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 6px;
`

const CommentProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 2px;

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 400px) {
    width: 28px;
    height: 28px;
  }
`

const CommentLeft = styled.div`
  display: flex;
  align-items: start;
`

const CommentLeftText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const CommentUser = styled.div`
  font-weight: bold;
  font-size: 0.9rem;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }

  @media (max-width: 400px) {
    font-size: 0.7rem;
  }
`

const CommentText = styled.p`
  font-size: 0.9rem;
  line-height: 26px;
  margin-right: 2px;
  color: #555;

  @media (max-width: 600px) {
    margin-top: 7px;
    font-size: 0.85rem;
  }

  @media (max-width: 400px) {
    margin-top: 6px;
    font-size: 0.8rem;
  }
`

const CommentTime = styled.div`
  font-size: 0.8rem;
  color: #aaa;
  flex-shrink: 0;
  margin-top: 13px;
`
