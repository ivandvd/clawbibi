export default function GuidesLoading() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header skeleton */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-40 rounded-lg bg-[#f0f0f0] animate-pulse" />
          <div className="h-4 w-64 rounded-lg bg-[#f0f0f0] animate-pulse" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f0f0f0] animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded-lg bg-[#f0f0f0] animate-pulse" />
                <div className="h-3 w-full rounded-lg bg-[#f0f0f0] animate-pulse" />
                <div className="h-3 w-3/4 rounded-lg bg-[#f0f0f0] animate-pulse" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <div className="h-3 w-20 rounded-lg bg-[#f0f0f0] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
