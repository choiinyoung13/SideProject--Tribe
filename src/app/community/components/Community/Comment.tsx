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
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
        <img
          src={
            comment.profileUrl
              ? comment.profileUrl
              : 'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg'
          }
          alt="Comment Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-gray-900">
            {comment.username ? comment.username : comment.email?.split('@')[0]}
          </span>
          <span className="text-xs text-gray-400">{dayjs(comment.timestamp).fromNow()}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed rounded-r-xl rounded-bl-xl inline-block">
          {comment.text}
        </p>
      </div>
    </div>
  )
}
