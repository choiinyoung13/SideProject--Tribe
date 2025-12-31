export default function ItmeCardSkeletonUI() {
  return (
    <div className="relative w-1/5 px-[12px] pb-[26px] max-[1600px]:w-1/4 max-[1300px]:w-1/3 max-[1024px]:w-1/2">
      {/* 스켈레톤 이미지 */}
      <div className="w-full pt-[100%] relative bg-[rgba(230,230,230,1)] bg-[length:200px_100%] rounded-[20px]" />
      {/* 스켈레톤 텍스트 (아이템 제목, 배지 영역 등) */}
      <div
        className="mt-[10px] bg-[rgba(230,230,230,1)] bg-[length:200px_100%] rounded-[4px] h-[18px] max-[600px]:mt-[8px]"
        style={{ width: '60%' }}
      />
      <div
        className="mt-[10px] bg-[rgba(230,230,230,1)] bg-[length:200px_100%] rounded-[4px] h-[16px] max-[600px]:mt-[8px]"
        style={{ width: '40%' }}
      />
      <div
        className="mt-[10px] bg-[rgba(230,230,230,1)] bg-[length:200px_100%] rounded-[4px] h-[16px] max-[600px]:mt-[8px]"
        style={{ width: '80%' }}
      />
      <div
        className="mt-[10px] bg-[rgba(230,230,230,1)] bg-[length:200px_100%] rounded-[4px] h-[16px] max-[600px]:mt-[8px]"
        style={{ width: '40%' }}
      />
    </div>
  )
}
