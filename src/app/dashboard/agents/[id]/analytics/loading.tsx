export default function Loading() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#e5e7eb]" />
        <div className="w-10 h-10 rounded-xl bg-[#e5e7eb]" />
        <div className="space-y-1.5">
          <div className="w-40 h-5 rounded-lg bg-[#e5e7eb]" />
          <div className="w-56 h-3.5 rounded-lg bg-[#f0f2f4]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-48 rounded-2xl bg-[#e5e7eb]" />
        <div className="w-full h-48 rounded-2xl bg-[#e5e7eb]" />
        <div className="w-full h-48 rounded-2xl bg-[#e5e7eb]" />
        <div className="w-full h-48 rounded-2xl bg-[#e5e7eb]" />
      </div>
    </div>
  );
}
