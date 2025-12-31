interface SpinnerType {
  width?: number
  height?: number
}

export default function Spinner({ width, height }: SpinnerType) {
  return (
    <div
      className="inline-block mx-auto rounded-full border-[3px] border-white/20 border-t-white animate-spin-ease"
      style={{
        width: width ? `${width}px` : '28px',
        height: height ? `${height}px` : '28px',
      }}
    />
  )
}
