import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

type ButtonProps = {
  children: React.ReactNode
  hover: string
  btntype?: 'link'
  colortype: 'white' | 'black'
  onClick?: () => void
}

export default function Button({
  children,
  hover,
  btntype,
  colortype,
  onClick,
}: ButtonProps) {
  const base =
    'flex items-center text-[1rem] px-[20px] py-[10px] cursor-pointer rounded-[10px] max-[768px]:px-[16px] max-[768px]:py-[8px] max-[768px]:text-[0.9rem] max-[414px]:w-[120px] max-[414px]:text-[0.6rem] max-[414px]:px-[10px] max-[414px]:py-[6px]'

  const color =
    colortype === 'white'
      ? 'bg-white text-[rgba(20,20,20,1)] border border-[rgba(150,150,150,0.5)]'
      : 'bg-[rgba(20,20,20,1)] text-white border-0'

  const hoverClass = hover === 'true' ? 'hover:bg-[rgba(40,40,40,1)]' : ''

  return (
    <button type="button" className={`${base} ${color} ${hoverClass}`} onClick={onClick}>
      {children}
      {btntype === 'link' && (
        <span className="flex items-center ml-[20px] text-[24px] max-[768px]:text-[20px] max-[768px]:ml-[10px] max-[414px]:ml-0 max-[414px]:text-[14px]">
          <MdOutlineKeyboardArrowRight />
        </span>
      )}
    </button>
  )
}
