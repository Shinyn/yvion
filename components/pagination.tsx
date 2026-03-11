'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { PaginationProps } from '@/types/tmdb';
import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';

export default function Pagination({ page, results, total_pages, total_results }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  // console.log(
  //   `Pagination here, we got page ${page}, total pages ${total_pages}, results ${results.map((e) => e.title)} and total results ${total_results}`,
  // );

  const maxPages = total_pages > 500 ? 500 : total_pages;
  const pages = Array.from({ length: maxPages }, (_, i) => i + 1);

  const currentPage = Number(searchParams.get('page') ?? 1);

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <div className="flex p-2 justify-center gap-2">
        <button
          className={`hover:cursor-pointer hover:bg-white hover:text-black p-2 rounded-md`}
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft />
        </button>
        <button
          className={`hover:cursor-pointer hover:bg-white hover:text-black p-2 rounded-md`}
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>
        <select
          className={`hover:cursor-pointer p-2 rounded-md text-black bg-white`}
          name="page"
          value={currentPage}
          onChange={(e) => changePage(Number(e.target.value))}
        >
          {pages.map((pageNumber) => (
            <option key={pageNumber} value={pageNumber}>
              Page {pageNumber}
            </option>
          ))}
        </select>
        <button
          className={`hover:cursor-pointer hover:bg-white hover:text-black p-2 rounded-md`}
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === maxPages}
        >
          <ChevronRight />
        </button>
        <button
          className={`hover:cursor-pointer hover:bg-white hover:text-black p-2 rounded-md`}
          onClick={() => changePage(total_pages > 500 ? 500 : total_pages)}
          disabled={currentPage === maxPages}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
