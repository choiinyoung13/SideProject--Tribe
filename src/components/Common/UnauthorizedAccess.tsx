import { useNavigate } from '@/shared/routing/navigation'

export default function UnauthorizedAccess() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center mt-[100px] h-[calc(100vh-100px)]">
      <div className="flex items-center flex-col">
        <h2>로그인 후 이용 가능한 서비스입니다.</h2>
        <button
          className="mt-[40px] text-[1rem] px-[18px] py-[12px] bg-[rgba(30,30,30,1)] text-white border-0 rounded-[6px] cursor-pointer hover:bg-[rgba(50,50,50,1)]"
          onClick={() => navigate('/login')}
        >
          로그인 페이지로 이동
        </button>
      </div>
    </div>
  )
}
