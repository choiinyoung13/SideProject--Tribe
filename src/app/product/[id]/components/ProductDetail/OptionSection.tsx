import { Info } from 'lucide-react'

export default function OptionsSection() {
  const items = [
    '농장 수급 상황에 따라 가격과 일부 꽃 구성이 유동적으로 변경될 수 있다는 점 양해 부탁드립니다.',
    '택배 배송으로 인한 약간의 꽃 눌림이 있을 수 있습니다.',
    '일조량 및 작황 상황에 따라서 꽃의 색감이 조금씩 달라질 수 있는 점 참고부탁드립니다.',
  ]

  return (
    <div className="my-[40px] max-[1024px]:my-[35px] max-[600px]:my-[35px]">
      <div className="bg-[#FFF9E6] rounded-2xl p-5 border border-[#FFE5B4]">
        <div className="flex items-center gap-2 mb-4">
          <Info size={20} className="text-[#D97706] shrink-0" />
          <h3 className="text-[1.3rem] font-[500] text-[#92400E] max-[1980px]:text-[1.1rem] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.9rem]">
            구매 전 확인 사항
          </h3>
        </div>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-[#F97316] rounded-sm mt-2 shrink-0" />
              <p className="text-[1.1rem] leading-[32px] text-[#92400E] max-[1980px]:text-[0.9rem] max-[1980px]:leading-[26px] max-[600px]:text-[0.8rem]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
