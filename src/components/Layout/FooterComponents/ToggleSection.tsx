import { MdKeyboardArrowRight } from 'react-icons/md'
import { ToggleSectionProps } from '@/types/FooterTypes'

export default function ToggleSection({
  title,
  isOpen,
  onToggle,
  children,
}: ToggleSectionProps) {
  return (
    <div className="w-full mb-[10px] pb-[12px] border-b border-b-[rgba(210,210,210,0.1)] last:border-0 last:pb-[4px]">
      <div
        className="flex justify-between items-center text-[1rem] font-[600] cursor-pointer p-[10px] bg-[rgba(30,30,30,1)] text-[rgba(210,210,210,1)] max-[1024px]:text-[0.8rem]"
        onClick={onToggle}
      >
        {title} <MdKeyboardArrowRight />
      </div>
      {isOpen && (
        <div className="p-[10px] bg-[rgba(30,30,30,1)] text-[rgba(210,210,210,1)] text-[0.8rem] font-[300] leading-[28px]">
          {children}
        </div>
      )}
    </div>
  )
}
