'use client';

import Image from 'next/image';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { Movie } from '@/types/tmdb';

export function Card(movie: Movie) {
  // console.log('This is the DATA', movieData);
  return (
    <>
      <section>
        <div key={movie.id}>
          <Image
            className="image"
            src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={250}
          ></Image>
          <h1>{movie.title}</h1>
        </div>
      </section>
    </>
  );
}
