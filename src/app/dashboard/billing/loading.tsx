import { Skeleton } from "@/components/skeletons/Skeleton";

export default function BillingLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div>
            <Skeleton className="h-6 w-28 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-8">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div><Skeleton className="h-3 w-20 mb-2" /><Skeleton className="h-6 w-16" /></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
            <Skeleton className="w-12 h-12 rounded-xl mb-4" />
            <Skeleton className="h-5 w-16 mb-2" />
            <Skeleton className="h-8 w-20 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
