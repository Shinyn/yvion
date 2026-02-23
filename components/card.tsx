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
        <div key={movie.id} onClick={goToMovie} className="relative movie-image">
          <Image
            className="rounded-2xl z-0"
            src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={250}
          ></Image>
          <span className="text-amber-400 top-4 font-bold drop-shadow-[0px_0px_1px] drop-shadow-black text-shadow-[0px_0px_3px] text-shadow-black left-4 z-10 absolute text-center">{`★ ${movie.vote_average.toString().slice(0, 3)}`}</span>
        </div>
      </section>
    </>
  );
}
