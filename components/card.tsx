'use client';

import Image from 'next/image';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { Movie } from '@/types/tmdb';
import { useRouter } from 'next/navigation';

export function Card(movie: Movie) {
  const router = useRouter();
  // console.log('This is the DATA', movieData);

  function goToMovie() {
    router.push(`/movie/${movie.id}`);
  }

  return (
    <>
      <section>
        <div key={movie.id} onClick={goToMovie}>
          <Image
            className="movie-image"
            src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={250}
          ></Image>
          <div className="text-amber-400 text-center">{`★ ${movie.vote_average.toString().slice(0, 3)}`}</div>
        </div>
      </section>
    </>
  );
}
