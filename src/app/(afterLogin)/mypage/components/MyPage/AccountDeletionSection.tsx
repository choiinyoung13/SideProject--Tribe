import { FaChevronDown } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { deleteUser } from '@/app/(afterLogin)/mypage/lib/user/deleteUser'
import { useNavigate } from '@/shared/routing/navigation'

interface AccountDeletionSectionProps {
  selectedReason: string
  setSelectedReason: (value: string) => void
  isDeletionButtonDisabled: boolean
}

export function AccountDeletionSection({
  setSelectedReason,
  isDeletionButtonDisabled,
}: AccountDeletionSectionProps) {
  const navigate = useNavigate()

  const setDeleteModalOpen = () => {
    Swal.fire({
      html: `
        <h1 style="font-weight:500; font-size:22px;">정말 탈퇴하시겠습니까?</h1><br/>
        <p style="font-size:16px;">회원 탈퇴 시 기존에 작성한 게시물 및 활동 기록이 삭제됩니다.</p>
      `,
      confirmButtonText: '탈퇴',
      showCancelButton: true,
      cancelButtonText: '취소',
      allowOutsideClick: false,
      confirmButtonColor: '#1E1E1E',
      cancelButtonColor: '#1E1E1E',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteUser()
        navigate('/')
      }
    })
  }

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between mb-[10px]">
        <div className="text-[1.2rem] font-[600] text-[rgba(50,50,50,1)] max-[768px]:text-[1.1rem]">
          회원 탈퇴
        </div>
      </div>
      <div className="w-full">
        <div className="relative inline-block w-full">
          <select
            className="w-full appearance-none p-[10px] text-[1rem] bg-[rgb(245,245,245)] border border-[rgba(230,230,230,1)] rounded-[6px] max-[768px]:text-[0.85rem]"
            defaultValue=""
            onChange={e => setSelectedReason(e.target.value)}
          >
            <option value="" disabled hidden>
              Tribe를 떠나는 이유를 들려주세요.
            </option>
            <option value="더 이상 사용하지 않아요">더 이상 사용하지 않아요</option>
            <option value="추천할 만한 서비스를 찾지 못했어요">
              추천할 만한 서비스를 찾지 못했어요
            </option>
            <option value="쿠폰 및 혜택이 적어요">쿠폰 및 혜택이 적어요</option>
            <option value="원하는 상품이 없어요">원하는 상품이 없어요</option>
            <option value="기타">기타</option>
          </select>
          <span className="absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none text-[1rem] text-[rgba(120,120,120,1)]">
            <FaChevronDown />
          </span>
        </div>
        <p className="leading-[28px] mt-[10px] text-[rgba(120,120,120,1)] text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis max-[768px]:text-[0.8rem]">
          * 회원 탈퇴 완료 후 계정은 다시 복구할 수 없습니다. <br />* 이전에 작성한 게시물 및
          활동 기록은 모두 삭제됩니다.
          <br />
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[rgb(30,30,30,1)] transition-colors duration-300 text-white border-0 rounded-[6px] p-[10px_20px] cursor-pointer text-[0.9rem] mt-[16px] hover:bg-[rgb(50,50,50,1)] disabled:bg-[rgba(150,150,150,1)] disabled:cursor-not-allowed"
          onClick={() => {
            setDeleteModalOpen()
          }}
          disabled={isDeletionButtonDisabled}
        >
          회원 탈퇴
        </button>
      </div>
    </section>
  )
}
