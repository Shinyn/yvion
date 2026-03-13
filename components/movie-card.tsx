'use client';

import Image from 'next/image';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { Movie } from '@/types/tmdb';
import { useRouter } from 'next/navigation';

export function MovieCard(movie: Movie) {
  const router = useRouter();
  const poster = movie?.poster_path;

  function goToMovie() {
    router.push(`/movie/${movie.id}`);
  }

  return (
    <>
      <section>
        <div
          key={movie.id}
          onClick={goToMovie}
          className="group relative border-transparent rounded-2xl border hover:scale-101 transition-transform
           hover:drop-shadow-yellow-200 hover:drop-shadow-xl duration-200 ease-in-out 
           hover:cursor-pointer hover:border-yellow-200"
        >
          <div className="group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out absolute w-full h-full z-10 rounded-2xl bg-linear-to-t from-black/80 to-transparent"></div>
          <Image
            className="rounded-2xl z-0"
            src={poster ? `${TMDB_IMAGE_BASE}/${poster}` : '/movie-placeholder.svg'}
            alt={movie.title}
            width={500}
            height={250}
          ></Image>

          {/* TITLE */}
          <span
            className="
              absolute bottom-4 left-4 right-0 z-10 drop-shadow-[0px_0px_1px] drop-shadow-black text-shadow-[0px_0px_3px] 
              text-shadow-black 
            text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          >
            {movie.title}
          </span>
          {/* RAITING */}
          <span
            className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-amber-400 top-4 
          font-bold drop-shadow-[0px_0px_1px] drop-shadow-black text-shadow-[0px_0px_3px] text-shadow-black left-4 z-10 
          absolute text-center"
          >{`★ ${movie.vote_average.toString().slice(0, 3)}`}</span>
        </div>
      </section>
    </>
  );
}
