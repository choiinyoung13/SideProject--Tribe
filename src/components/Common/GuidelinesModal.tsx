import { FaSeedling } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import ReactDOM from 'react-dom'

interface GuidelinesModalProps {
  onClose: () => void
}

export default function GuidelinesModal({ onClose }: GuidelinesModalProps) {
  return ReactDOM.createPortal(
    <div
      className="fixed z-[1005] inset-0 bg-black/50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white px-[35px] py-[45px] rounded-[10px] w-[90%] min-w-[375px] max-w-[600px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-[15px] right-[12px] bg-transparent border-0 cursor-pointer text-[#666]"
          onClick={onClose}
        >
          <IoCloseSharp size={24} />
        </button>
        <section className="mb-[60px]">
          <h2 className="text-[1.5rem] mb-[30px] text-[#2e7d32] flex items-center max-[768px]:text-[1.3rem] max-[600px]:text-[1.2rem] [&_svg]:mr-[8px]">
            <FaSeedling size={20} color="#8BC34A" /> 일반 규칙
          </h2>
          <ul className="flex flex-col gap-[25px] list-none p-0">
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🌱 다른 회원들에게 항상 존중과 친절을 보여주세요.
            </li>
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🌿 신뢰할 수 있고 정확한 식물 정보를 공유하세요.
            </li>
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🌸 허가 없이 광고나 스팸을 게시하지 마세요.
            </li>
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🍀 친근하고 환영하는 분위기를 유지하세요.
            </li>
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🌵 모욕적이거나 부적절한 언어 사용을 피하세요.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.5rem] mb-[30px] text-[#2e7d32] flex items-center max-[768px]:text-[1.3rem] max-[600px]:text-[1.2rem] [&_svg]:mr-[8px]">
            <FaSeedling size={20} color="#8BC34A" /> 게시물 작성 가이드라인
          </h2>
          <ul className="flex flex-col gap-[25px] list-none p-0">
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🌻 게시물의 제목은 명확하고 설명이 잘 되어 있어야 합니다.
            </li>
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🍃 식물에 관한 이미지를 업로드하세요.
            </li>
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🌺 중복된 질문을 피하고, 게시하기 전에 검색하세요.
            </li>
            <li className="text-[1.2rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[1rem] max-[600px]:text-[0.9rem] truncate">
              🍂 게시물은 올바른 카테고리에 게시하세요.
            </li>
          </ul>
        </section>
      </div>
    </div>,
    document.body // 여기서 Portal을 사용해 document.body로 이동
  )
}
