'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { HeaderProps } from '@/types/tmdb';
import Image from 'next/image';
import Pagination from './pagination';
import { useState, useEffect } from 'react';

export function Header({ data }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') ?? 'now_playing';
  const [index, setIndex] = useState(0);
  const backdrops = data.results.map((movie) => movie.backdrop_path).filter(Boolean);

  useEffect(() => {
    if (!backdrops.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backdrops.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backdrops.length]);

  const currentSearch = searchParams.get('search') ?? '';
  const [query, setQuery] = useState(currentSearch);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    setQuery('');

    params.set('category', value);
    params.delete('search'); // category view should reset search
    params.set('page', '1');
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  const paramsString = searchParams.toString();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(paramsString);
      const currentSearch = params.get('search') ?? '';

      if (query === currentSearch) return;
      if (query) {
        params.set('search', query);
        params.delete('category');
        params.set('page', '1');
      } else {
        params.delete('search');
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [query, router, paramsString]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <header className="flex flex-col justify-center">
      <div className="relative">
        <Image
          className="mx-auto transition-all duration-1000 w-[clamp(200px,100vw,90rem)] "
          src={backdrops.length ? `${TMDB_IMAGE_BASE}/${backdrops[index]}` : '/placeholder-backdrop.jpg'}
          alt="background"
          width={500}
          height={250}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black" />
      </div>
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="I want to watch..."
        className=" border border-white rounded-2xl justify-self-center w-[clamp(200px,50vw,30rem)] px-4 py-[.2rem] m-4 mx-auto bg-[#1f1f1f]"
      />
      <Pagination
        page={data.page}
        results={data.results}
        total_pages={data.total_pages}
        total_results={data.total_results}
      />
      <select
        className="text-black mx-auto p-1 rounded-md bg-white w-30"
        name="Movie Lists"
        value={currentCategory}
        onChange={handleChange}
      >
        <option value="now_playing">Now Playing</option>
        <option value="popular">Popular</option>
        <option value="top_rated">Top Rated</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </header>
  );
}
