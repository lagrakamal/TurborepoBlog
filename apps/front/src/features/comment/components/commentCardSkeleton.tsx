import { Skeleton } from "@/shared/ui/skeleton";

const CommentCardSkeleton = () => {
  return (
    <div className="p-4 shadow rounded-md flex flex-col gap-4 bg-white">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-4 w-32 sm:w-48" />
      </div>
      <Skeleton className="h-6 w-full max-w-[90%]" />
    </div>
  );
};

export default CommentCardSkeleton;
