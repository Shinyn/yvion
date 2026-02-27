import { fetchTMDBItem } from '@/lib/tmdb';
import Image from 'next/image';
import { TMDB_IMAGE_BASE } from '@/lib/constants';

export default async function Movies({ params }: { params: { movieId: string } }) {
  const { movieId } = await params;
  console.log('PARAM:', movieId);
  const movie = await fetchTMDBItem(`/movie/${movieId}`);

  const trailer = await fetchTMDBItem(`/movie/${movieId}/videos`);
  console.log(trailer);

  return (
    <div className="h-screen">
      <section className="bg-center bg-[url(@/public/movie-theater.png)]  bg-cover flex items-center h-full justify-center align-middle relative">
        <div className="flex justify-center">
          <Image
            src={`${TMDB_IMAGE_BASE}/${movie.poster_path}`}
            alt={`${movie.title}`}
            height={300}
            width={300}
            className="rounded-l-2xl border border-r-0 border-black shadow-2xl "
          />
          <p className="movie-description border text-black text-pretty border-l-0 rounded-r-2xl font-bold backdrop-blur-md text-xl p-4 text-center">
            {movie.overview}
          </p>
        </div>
      </section>
      {/* <h1 className="bg-amber-500 text-center text-5xl p-4 border border-white text-black font-bold">{movie.title}</h1> */}
      {/* <Image
        className="w-50"
        src={`${TMDB_IMAGE_BASE}/${movie.backdrop_path}`}
        alt={`${movie.title}`}
        height={300}
        width={300}
      /> */}
    </div>
  );
}

// Vad ska finnas med när man klickar på en film?
/*
Bild
Info
Trailer
Var man hittar filmen

*/
