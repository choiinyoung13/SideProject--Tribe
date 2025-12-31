interface AgreeSectionProps {
  isRequiredChecked: boolean
  setIsRequiredChecked: React.Dispatch<React.SetStateAction<boolean>>
  disabled: boolean
}

// 필수 약관 동의 섹션
export default function AgreeSection({
  isRequiredChecked,
  setIsRequiredChecked,
  disabled,
}: AgreeSectionProps) {
  return (
    <div className="mt-[40px] mb-[10px] border-t border-[rgba(150,150,150,1)] pt-[24px] max-[600px]:mt-[20px] max-[600px]:pt-[20px]">
      {/* 필수 동의 */}
      <div className="flex items-center justify-between mb-[10px] w-full">
        <div className={`max-[600px]:flex ${disabled ? 'opacity-70' : 'opacity-100'}`}>
          <input
            className="m-[10px_10px_0_0] max-[600px]:w-[10px] max-[600px]:m-[0_14px_0_0]"
            type="checkbox"
            checked={isRequiredChecked}
            onChange={e => setIsRequiredChecked(e.target.checked)}
            disabled={disabled}
          />
          <label className="text-[0.9rem] max-[600px]:text-[0.8rem]">
            <span className="text-red-500">[필수]</span> 서비스 이용 관련 약관에 모두
            동의합니다.
          </label>
        </div>
      </div>

      {/* 선택 동의 */}
      <div className="flex items-center justify-between mb-[10px] w-full mt-[16px]">
        <div className={`max-[600px]:flex ${disabled ? 'opacity-70' : 'opacity-100'}`}>
          <input
            className="m-[10px_10px_0_0] max-[600px]:w-[10px] max-[600px]:m-[0_14px_0_0]"
            type="checkbox"
            disabled={disabled}
          />
          <label className="text-[0.9rem] max-[600px]:text-[0.8rem]">
            [선택]광고성 정보 수신에 모두 동의합니다.
          </label>
        </div>
      </div>
    </div>
  )
}
