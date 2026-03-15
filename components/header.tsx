'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { HeaderProps } from '@/types/tmdb';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export function Header({ data }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') ?? 'now_playing';
  const [index, setIndex] = useState(0);
  const backdrops = data.results.map((movie) => movie.backdrop_path).filter(Boolean);
  const currentSearch = searchParams.get('search') ?? '';
  const [query, setQuery] = useState(currentSearch);
  const paramsString = searchParams.toString();
  const currentDecade = searchParams.get('decade') ?? '';
  const currentSort = searchParams.get('sort') ?? '';

  // SLIDESHOW
  useEffect(() => {
    if (!backdrops.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backdrops.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backdrops.length]);

  // CATEGORY
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    setQuery('');
    params.set('category', value);
    params.delete('search'); // category view should reset search
    params.set('page', '1');
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  // SEARCH
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

  // SEARCH INPUT
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <header className="flex flex-col w-full max-w-360 mx-auto">
      <div className="flex border-6 border-double border-amber-500 max-[800px]:justify-between">
        <Image className="p-2" src={'/logo.png'} alt="logo" width={80} height={80} />
        <div className="mx-auto max-[800px]:mx-0 relative flex items-center">
          <Search className="absolute left-2 w-5 h-5 text-[#999999]" />
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="I want to watch..."
            className="pl-10  border border-white rounded-2xl w-[clamp(180px,40vw,30rem)] px-4 py-[.2rem] m-4 mx-auto bg-[#1f1f1f]"
          />
        </div>
      </div>
      <div className="relative border-6 border-t-0 border-double border-amber-500">
        <Image
          className="mx-auto transition-all duration-1000 w-[clamp(200px,100vw,90rem)] "
          src={backdrops.length ? `${TMDB_IMAGE_BASE}/${backdrops[index]}` : '/placeholder-backdrop.jpg'}
          alt="background"
          width={500}
          height={250}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black" />
      </div>
      <div className="justify-center border-x-6 border-double border-amber-500 w-full flex flex-wrap gap-4 p-4 pt-6">
        <select
          className="text-white bg-[#1f1f1f] border-white border py-2 px-1 rounded-lg w-30"
          name="Movie Lists"
          value={currentCategory}
          onChange={handleChange}
        >
          <option value="now_playing">Now Playing</option>
          <option value="popular">Popular</option>
          <option value="top_rated">Top Rated</option>
          <option value="upcoming">Upcoming</option>
        </select>

        <select
          value={currentDecade}
          className="text-white bg-[#1f1f1f] border-white border py-2 px-1 rounded-lg w-30"
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('decade', e.target.value);
            params.set('page', '1');

            router.push(`/?${params.toString()}`);
          }}
        >
          <option value="">All Years</option>
          <option value="1900">1900s</option>
          <option value="1910">1910s</option>
          <option value="1920">1920s</option>
          <option value="1930">1930s</option>
          <option value="1940">1940s</option>
          <option value="1950">1950s</option>
          <option value="1960">1960s</option>
          <option value="1970">1970s</option>
          <option value="1980">1980s</option>
          <option value="1990">1990s</option>
          <option value="2000">2000s</option>
          <option value="2010">2010s</option>
          <option value="2020">2020s</option>
        </select>

        <select
          value={currentSort}
          className="text-white bg-[#1f1f1f] border-white border py-2 px-1 rounded-lg w-30"
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('sort', e.target.value);
            params.set('page', '1');

            router.push(`/?${params.toString()}`);
          }}
        >
          <option value="">Sort by</option>
          <option value="title.asc">Title A → Z</option>
          <option value="title.desc">Title Z → A</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="primary_release_date.desc">Newest</option>
        </select>
      </div>
    </header>
  );
}
