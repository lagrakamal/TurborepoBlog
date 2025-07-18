import { calculatePageNumbers } from "@/shared/lib/helpers";
import { cn } from "@/shared/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};

const CommentPagination = ({
  pageNeighbors = 2,
  currentPage,
  totalPages,
  setCurrentPage,
  className,
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages,
  });

  const handleClick = (page: number | string) => {
    if (typeof page == "number" && page > 0 && page <= totalPages)
      setCurrentPage(page);
  };
  return (
    <div className={cn(className, "flex items-center justify-center gap-2")}>
      {/* previous page button */}
      {currentPage != 1 && (
        <button
          onClick={() => handleClick(currentPage - 1)}
          className={cn("rounded-md bg-slate-200 py-2 px-2 ")}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-4 " />
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          onClick={() => handleClick(page)}
          key={index}
          disabled={page == "..."}
          className={cn("px-3 py-1 rounded-md transition hover:text-sky-600", {
            "bg-slate-200": currentPage != page && page != "...",
            "bg-blue-500 text-white hover:text-black": currentPage == page,
          })}
        >
          {page == "..." ? "..." : <span>{page}</span>}
        </button>
      ))}
      {/* next page button */}

      {currentPage != totalPages && (
        <button
          onClick={() => handleClick(currentPage + 1)}
          className={cn("rounded-md bg-slate-200 py-2 px-2 ")}
        >
          {" "}
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
};

export default CommentPagination;
