// import Image from 'next/image';
import { fetchTMDB } from '../lib/tmdb';
import { Movie, HomeProps } from '@/types/tmdb';
import { Card } from '@/components/card';
import { Header } from '@/components/header';

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const category = params?.category ?? 'now_playing';
  const rawPage = Number(params.page ?? '1');
  const page = Math.min(Math.max(rawPage, 1), 500);
  const search = params.search;

  let endpoint;

  if (search) {
    endpoint = `/search/movie?query=${encodeURIComponent(search)}&page=${page}`;
  } else {
    endpoint = `/movie/${category}?page=${page}`;
  }

  const data = await fetchTMDB<Movie>(endpoint);

  return (
    <>
      <Header data={data} />

      <main className="main w-[clamp(200px,100vw,90rem)] mx-auto p-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {data.results.map((movie) => (
          <Card key={movie.id} {...movie} />
        ))}
      </main>
    </>
  );
}
