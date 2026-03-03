import { fetchTMDBItem } from '@/lib/tmdb';
import Image from 'next/image';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { Movie, VideoResponse } from '@/types/tmdb';

export default async function Movies({ params }: { params: { movieId: string } }) {
  const { movieId } = await params;
  console.log('PARAM:', movieId);
  const movie = await fetchTMDBItem<Movie & { videos: VideoResponse }>(`/movie/${movieId}?append_to_response=videos`);
  console.log('This is the movie', movie);
  const officialTrailer = movie.videos.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube' && video.official,
  );

  return (
    <div className="h-screen">
      <section className="p-4 bg-center bg-[url(@/public/movie-theater.png)] backdrop-blur-md bg-cover flex flex-col gap-4 items-center h-full justify-center align-middle relative">
        <iframe
          className="w-full max-w-300 px-2 h-full"
          src={`https://www.youtube.com/embed/${officialTrailer?.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="flex justify-center max-[1000px]:flex-col max-w-200 z-50 max-[1000px]:place-items-center max-[1000px]:p-2">
          <Image
            src={`${TMDB_IMAGE_BASE}/${movie.poster_path}`}
            alt={`${movie.title}`}
            height={800}
            width={400}
            className="rounded-l-2xl  border border-r-0 border-black 
            max-[1000px]:rounded-l-0 max-[1000px]:rounded-t-2xl
             max-[1000px]:border-b-0 max-[1000px]:rounded-b-none"
          />
          <div
            className="max-[1000px]:w-[clamp(20vw,400px,100%)] w-[clamp(25vw,30vw,100%)] 
            bg-white/50 border justify-between flex flex-col 
            text-black text-pretty border-l-0 rounded-r-2xl max-[1000px]:rounded-t-none max-[1000px]:rounded-b-2xl max-[1000px]:border-l font-bold 
            backdrop-blur-md text-shadow-indigo-200
             text-xl p-4 text-center"
          >
            <span className="text-2xl border-b-2 border-amber-800">{movie.original_title}</span>
            <p>{movie.overview}</p>
            <span className="flex justify-center gap-2 bg-red-500/70 rounded-md">
              {movie.genres.map((item) => {
                console.log('This is the genres', item.name);
                return <span key={item.id}>{item.name}</span>;
              })}
            </span>
            <span className="place-content-end rounded-md bg-white/70">{movie.release_date}</span>
          </div>
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
