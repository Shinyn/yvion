'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Movie, TMDBResponse } from '@/types/tmdb';

export default function Pagination({ page, results, total_pages, total_results }: TMDBResponse<Movie>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log('This is the searchParams', searchParams);
  console.log(
    `Pagination here, we got page ${page}, total pages ${total_pages}, results ${results.map((e) => e.title)} and total results ${total_results}`,
  );

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
      <div className="flex p-2 justify-center bg-blue-950 gap-2">
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button>{page}</button>
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === total_pages}>
          Next
        </button>
        <button onClick={() => changePage(total_pages)} disabled={currentPage === total_pages}>
          Last
        </button>
      </div>
    </div>
  );
}
