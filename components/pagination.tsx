'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Movie, TMDBResponse } from '@/types/tmdb';
import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';

export default function Pagination({ page, results, total_pages, total_results }: TMDBResponse<Movie>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log('This is the searchParams', searchParams);
  console.log(
    `Pagination here, we got page ${page}, total pages ${total_pages}, results ${results.map((e) => e.title)} and total results ${total_results}`,
  );

  const pages = Array.from({ length: total_pages }, (_, i) => i + 1);

  const currentPage = Number(searchParams.get('page') ?? 1);
  const category = searchParams.get('category') ?? 'now_playing';

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    params.set('category', category);
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
          className={`hover:cursor-pointer p-2 rounded-md`}
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
          disabled={currentPage === total_pages}
        >
          <ChevronRight />
        </button>
        <button
          className={`hover:cursor-pointer hover:bg-white hover:text-black p-2 rounded-md`}
          onClick={() => changePage(total_pages)}
          disabled={currentPage === total_pages}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
