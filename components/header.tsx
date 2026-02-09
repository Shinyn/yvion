'use client';

import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { Movie, TMDBResponse } from '@/types/tmdb';
import Image from 'next/image';

export function Header(data: TMDBResponse<Movie>) {
  return (
    <header className="header">
      <input type="text" placeholder="I want to watch..." className="search" />
      <Image
        className="banner-background"
        src={`${TMDB_IMAGE_BASE}/${data.results[0].backdrop_path}`}
        alt="background"
        width={500}
        height={250}
      ></Image>
    </header>
  );
}
