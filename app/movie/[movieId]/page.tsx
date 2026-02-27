import { fetchTMDBItem } from '@/lib/tmdb';
import Image from 'next/image';
import { TMDB_IMAGE_BASE } from '@/lib/constants';

export default async function Movies({ params }: { params: { movieId: string } }) {
  const { movieId } = await params;
  console.log('PARAM:', movieId);
  const movie = await fetchTMDBItem(`/movie/${movieId}`);
  console.log(movie);

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
          <p
            className="movie-description bg-white/50 border justify-between flex flex-col text-black text-pretty border-l-0 
          rounded-r-2xl font-bold backdrop-blur-md text-shadow-indigo-200 text-xl p-4 text-center"
          >
            <span className="text-2xl border-b-2 border-amber-400">{movie.original_title}</span>
            <span>{movie.overview}</span>
            <div className="flex justify-center gap-2 bg-red-500/70 rounded-md">
              {movie.genres.map((item) => {
                return <span key={movie.id}>{item.name}</span>;
              })}
            </div>

            <span className="place-content-end rounded-md bg-white/70">{movie.release_date}</span>
          </p>
        </div>
      </section>
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

/*
Ska kunna ta bort filmer man inte är intresserad av -> delete knapp
som lägger till filmens id i en array och sen filtrerar filmer med arrayen
så man bara ser filmer som INTE ligger i arrayen.
*/
