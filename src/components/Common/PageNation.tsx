import { GrFormPrevious } from 'react-icons/gr'
import { GrFormNext } from 'react-icons/gr'

export default function PageNation() {
  return (
    <div className="w-full max-[768px]:hidden">
      <div className="w-[22%] min-w-[380px] flex justify-between items-center mx-auto">
        <button className="bg-transparent border-0 text-[1.6rem] cursor-pointer pt-[5px]" disabled>
          <GrFormPrevious />
        </button>
        <ul className="w-[70%] h-[40px] flex justify-between items-center">
          <li className="cursor-pointer flex justify-center items-center bg-[rgba(30,30,30,1)] text-white rounded-full w-[26px] h-[26px] pb-[2px] mt-[3px]">
            1
          </li>
          <li className="cursor-pointer">2</li>
          <li className="cursor-pointer">3</li>
          <li className="cursor-pointer">4</li>
          <li className="cursor-pointer">5</li>
          <li className="cursor-pointer">6</li>
        </ul>
        <button className="bg-transparent border-0 text-[1.6rem] cursor-pointer pt-[5px]">
          <GrFormNext />
        </button>
      </div>
    </div>
  )
}
