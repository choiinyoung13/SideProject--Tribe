import { useNavigate } from '@/shared/routing/navigation'

export default function SearchItem({
  title,
  id,
  imgUrl,
}: {
  title: string
  id: number
  imgUrl: string
}) {
  const navigate = useNavigate()

  return (
    <li
      className="w-full py-[10px] border-b border-[rgba(220,220,220,1)] cursor-pointer flex items-center last:border-0 last:pt-[18px] last:pb-0"
      onClick={e => {
        e.stopPropagation()
        navigate(`/product/${id}`)
      }}
    >
      <div className="w-[46px]">
        <img className="w-full rounded-[10px]" src={imgUrl} alt="" />
      </div>
      <span className="ml-[14px] text-[rgba(60,60,60,1)] text-[0.9rem] hover:text-black hover:font-[500] hover:text-[1rem]">
        {title}
      </span>
    </li>
  )
}
