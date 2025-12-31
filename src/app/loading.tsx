export default function Loading() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-white"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center gap-2" aria-label="로딩 중">
        <span className="sr-only">Loading…</span>
        <div className="w-2 h-2 rounded-full bg-black motion-safe:animate-dot-pulse" />
        <div
          className="w-2 h-2 rounded-full bg-black motion-safe:animate-dot-pulse"
          style={{ animationDelay: '0.2s' }}
        />
        <div
          className="w-2 h-2 rounded-full bg-black motion-safe:animate-dot-pulse"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
    </div>
  )
}
