import { calculatePageNumbers } from "@/shared/lib/helpers";
import { cn } from "@/shared/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  className?: string;
};

const pagination = ({
  totalPages,
  currentPage,
  pageNeighbors = 3,
  className,
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages,
  });

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* previous page button */}
      {currentPage != 1 && (
        <button className={cn("rounded-md bg-slate-200 py-2 px-2 ")}>
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className="w-4 " />
          </Link>
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn("px-3 py-1 rounded-md transition hover:text-sky-600", {
            "bg-slate-200": currentPage != page && page != "...",
            "bg-blue-500 text-white hover:text-black": currentPage == page,
          })}
        >
          {page == "..." ? "..." : <Link href={`?page=${page}`}>{page}</Link>}
        </button>
      ))}
      {/* next page button */}

      {currentPage != totalPages && (
        <button className={cn("rounded-md bg-slate-200 py-2 px-2 ")}>
          {" "}
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default pagination;
