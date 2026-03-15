import { Skeleton } from "@/components/skeletons/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div><Skeleton className="h-5 w-32 mb-2" /><Skeleton className="h-4 w-48" /></div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
          <Skeleton className="h-5 w-28 mb-4" />
          <Skeleton className="h-12 w-full rounded-xl mb-3" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
