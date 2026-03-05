'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { HeaderProps } from '@/types/tmdb';
import Image from 'next/image';
import Pagination from './pagination';

export function Header({ data }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') ?? 'now_playing';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    router.push(`/?category=${value}`, { scroll: false });
    router.refresh();
  }

  return (
    <header className="header">
      {/* Gör om denna Image till ett bildspel som loopar igenom samtliga filmer 
          (på nuvarande page) och har dom som bakgrundsbild. Ska fade'a till svart
          mot botten
      */}
      <Image
        className=" overflow-clip "
        src={`${TMDB_IMAGE_BASE}/${data.results[0].backdrop_path}`}
        alt="background"
        width={500}
        height={250}
      ></Image>
      <Pagination
        page={data.page}
        results={data.results}
        total_pages={data.total_pages}
        total_results={data.total_results}
      />
      <input type="text" placeholder="I want to watch..." className="search" />
      <select name="Movie Lists" value={currentCategory} onChange={handleChange}>
        <option value="now_playing">Now Playing</option>
        <option value="popular">Popular</option>
        <option value="top_rated">Top Rated</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </header>
  );
}

/*
Ska innehålla filtrering, searchbar, logo, paginering och nån typ av bakgrundsbild
*/
