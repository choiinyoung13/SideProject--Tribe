import './ProductInfo.css'

interface ProductInfoPropsType {
  title: string
  size: string
  origin: string
  classification: string
  deliveryPeriod: number
}

export default function ProductInfo({
  size,
  origin,
  classification,
  deliveryPeriod,
}: ProductInfoPropsType) {
  return (
    <div className="flex flex-nowrap gap-4 my-6 max-[1024px]:my-5 max-[600px]:my-4 overflow-x-auto">
      <div className="bg-[rgba(240,240,240,1)] px-4 py-3 rounded-lg flex flex-col items-center text-center shrink-0">
        <div className="text-[0.9rem] text-[rgba(120,120,120,1)] mb-2 shrink-0 max-[1980px]:text-[0.8rem] max-[1024px]:text-[0.8rem] max-[600px]:text-[0.7rem]">
          사이즈
        </div>
        <div className="text-[1.1rem] font-semibold text-[rgba(30,30,30,1)] shrink-0 whitespace-nowrap max-[1980px]:text-[0.9rem] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.8rem]">
          {size}
        </div>
      </div>
      <div className="bg-[rgba(240,240,240,1)] px-4 py-3 rounded-lg flex flex-col items-center text-center shrink-0">
        <div className="text-[0.9rem] text-[rgba(120,120,120,1)] mb-2 shrink-0 max-[1980px]:text-[0.8rem] max-[1024px]:text-[0.8rem] max-[600px]:text-[0.7rem]">
          분류
        </div>
        <div className="text-[1.1rem] font-semibold text-[rgba(30,30,30,1)] shrink-0 whitespace-nowrap max-[1980px]:text-[0.9rem] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.8rem]">
          {classification}
        </div>
      </div>
      <div className="bg-[rgba(240,240,240,1)] px-4 py-3 rounded-lg flex flex-col items-center text-center shrink-0">
        <div className="text-[0.9rem] text-[rgba(120,120,120,1)] mb-2 shrink-0 max-[1980px]:text-[0.8rem] max-[1024px]:text-[0.8rem] max-[600px]:text-[0.7rem]">
          원산지
        </div>
        <div className="text-[1.1rem] font-semibold text-[rgba(30,30,30,1)] shrink-0 whitespace-nowrap max-[1980px]:text-[0.9rem] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.8rem]">
          {origin}
        </div>
      </div>
      <div className="bg-[rgba(240,240,240,1)] px-4 py-3 rounded-lg flex flex-col items-center text-center shrink-0">
        <div className="text-[0.9rem] text-[rgba(120,120,120,1)] mb-2 shrink-0 max-[1980px]:text-[0.8rem] max-[1024px]:text-[0.8rem] max-[600px]:text-[0.7rem]">
          배송기간
        </div>
        <div className="text-[1.1rem] font-semibold text-[rgba(30,30,30,1)] shrink-0 whitespace-nowrap max-[1980px]:text-[0.9rem] max-[1024px]:text-[0.9rem] max-[600px]:text-[0.8rem]">
          {deliveryPeriod}일
        </div>
      </div>
    </div>
  )
}
