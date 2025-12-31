import error_image from '@/assets/images/error_web_1.jpg'
import { assetSrc } from '@/shared/lib/asset'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mt-[120px] mb-[20px] w-full min-h-[calc(100vh-120px)] bg-white flex items-center justify-center">
      <div className="w-[45%] min-w-[600px] h-[calc(100vh-120px)] flex items-center justify-center ml-[200px] max-[1250px]:hidden">
        <img className="w-[80%]" src={assetSrc(error_image)} alt="" />
      </div>
      <div className="w-[55%] h-[calc(100vh-120px)] flex flex-col max-[1250px]:items-center max-[1250px]:w-full">
        <div className="text-[12rem] font-[500] mt-[130px] mb-[40px] max-[600px]:text-[8rem]">
          404
        </div>
        <div className="max-[1250px]:flex max-[1250px]:flex-col max-[1250px]:items-center">
          <div className="text-[3rem] font-[500] mb-[14px] max-[600px]:text-[1.8rem]">
            Not found...
          </div>
          <div className="text-[1.5rem] font-[400] mb-[50px] max-[600px]:text-[1.2rem]">
            Page you&apos;re looking for in not found
          </div>
        </div>
        <Link
          href="/"
          className="w-[200px] cursor-pointer p-[10px] text-[1.8rem] text-white bg-[rgba(30,30,30,1)] max-[600px]:w-[170px] max-[600px]:text-[1.5rem] text-center"
        >
          Go back
        </Link>
      </div>
    </div>
  )
}
