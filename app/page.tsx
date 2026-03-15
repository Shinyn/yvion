// import Image from 'next/image';
import { fetchTMDB } from '../lib/tmdb';
import { Movie, HomeProps } from '@/types/tmdb';
import { MovieCard } from '@/components/movie-card';
import { Header } from '@/components/header';

import Pagination from '@/components/pagination';

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const category = params?.category ?? 'now_playing';
  const rawPage = Number(params.page ?? '1');
  const page = Math.min(Math.max(rawPage, 1), 500);
  const search = params.search;
  const decade = params.decade;
  const sort = params.sort;
  let endpoint = '';

  if (search) {
    endpoint = `/search/movie?query=${encodeURIComponent(search)}&page=${page}`;
  } else if (decade || sort) {
    const query = new URLSearchParams();
    query.set('page', String(page));

    if (sort) {
      query.set('sort_by', sort);
    }

    if (decade) {
      query.set('primary_release_date.gte', `${decade}-01-01`);
      query.set('primary_release_date.lte', `${Number(decade) + 9}-12-31`);
    }

    endpoint = `/discover/movie?${query.toString()}`;
  } else {
    endpoint = `/movie/${category}?page=${page}`;
  }

  const data = await fetchTMDB<Movie>(endpoint);

  return (
    <>
      <Header data={data} />

      <main className="main border-x-6 border-double border-amber-500 w-full max-w-360 mx-auto p-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </main>
      <nav className="w-full ">
        <Pagination
          page={data.page}
          results={data.results}
          total_pages={data.total_pages}
          total_results={data.total_results}
        />
      </nav>
      <footer className="h-20 bg-black text-center max-w-360 mx-auto p-4 w-full border-6 border-double border-amber-500">
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>©2026</p>
      </footer>
    </>
  );
}
