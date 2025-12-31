export default function PostCardSkeletonUI() {
  return (
    <div className="flex flex-col gap-[18px] w-[calc(25%_-_15px)] box-border max-[1600px]:w-[calc(33.33%_-_13.5px)] max-[1300px]:w-[calc(50%_-_10.5px)] max-[768px]:w-[calc(50%_-_20px)]">
      <div className="w-full pt-[100%] relative rounded-[5%] bg-[#ddd]" />
      <div className="flex flex-col gap-[12px]">
        <div className="h-[20px] bg-[#ddd] rounded-[4px]" style={{ width: '60%' }} />
        <div className="h-[20px] bg-[#ddd] rounded-[4px]" style={{ width: '80%' }} />
      </div>
    </div>
  )
}
