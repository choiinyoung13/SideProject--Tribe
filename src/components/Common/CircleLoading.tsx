export default function CircleLoading() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="w-[6px] h-[6px] mx-[5px] bg-[#3498db] rounded-full animate-pulse-scale"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="w-[6px] h-[6px] mx-[5px] bg-[#3498db] rounded-full animate-pulse-scale"
        style={{ animationDelay: '0.2s' }}
      />
      <div
        className="w-[6px] h-[6px] mx-[5px] bg-[#3498db] rounded-full animate-pulse-scale"
        style={{ animationDelay: '0.4s' }}
      />
    </div>
  )
}
