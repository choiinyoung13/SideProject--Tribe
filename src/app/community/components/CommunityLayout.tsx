export function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[100px] min-h-[calc(100vh-100px)] border-t border-gray-100 bg-white text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 max-[1024px]:mt-[98px] max-[1024px]:min-h-[calc(100vh-98px)] max-[768px]:mt-[65px] max-[768px]:min-h-[calc(100vh-65px)] max-[600px]:mt-[53px] max-[600px]:min-h-[calc(100vh-53px)]">
      <div className="w-full px-[32px] py-8 max-[768px]:px-[20px] max-[600px]:px-[12px]">
        {children}
      </div>
    </div>
  )
}
