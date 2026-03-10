import { fetchTMDBItem } from '@/lib/tmdb';
import Image from 'next/image';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { Movie, VideoResponse, WatchProviderResponse } from '@/types/tmdb';
import { Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function Movies({ params }: { params: { movieId: string } }) {
  const { movieId } = await params;
  // console.log('PARAM:', movieId);
  const movie = await fetchTMDBItem<Movie & { videos: VideoResponse; 'watch/providers': WatchProviderResponse }>(
    `/movie/${movieId}?append_to_response=videos,watch/providers`,
  );
  // console.log('This is the movie', movie);
  const officialTrailer = movie.videos.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube' && video.official,
  );

  // const providers = movie['watch/providers'].results.SE;

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  // const budget = Math.floor(movie.budget / 1000000);
  // const revenue = Math.floor(movie.revenue / 1000000);

  // const earnings = revenue - budget;
  // const total = earnings > 0 ? `${movie.title} made $${earnings}M` : `${movie.title} lost $${earnings}M`;

  console.log('These are the Providers:', movie['watch/providers']);
  console.log(Object.keys(movie['watch/providers'].results));

  return (
    <div className="bg-center bg-cover bg-[url(@/public/movie-theater.png)] h-screen max-[1000px]:h-full">
      <section className="p-2 backdrop-blur-sm flex flex-col gap-4 items-center h-full justify-center align-middle relative">
        <iframe
          className="w-full max-w-300 min-h-110 h-full"
          src={`https://www.youtube.com/embed/${officialTrailer?.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="flex justify-center max-[800px]:flex-col max-w-200 z-50 max-[800px]:place-items-center">
          <Image
            src={`${TMDB_IMAGE_BASE}/${movie.poster_path}`}
            alt={`${movie.title}`}
            height={800}
            width={400}
            className="rounded-l-2xl border max-[800px]:border-r border-r-0 border-black 
            max-[800px]:rounded-l-0 max-[800px]:rounded-t-2xl
             max-[800px]:border-b-0 max-[800px]:rounded-b-none"
          />
          <section
            className="max-[1000px]:w-[clamp(20vw,400px,100%)] w-[clamp(25vw,30vw,100%)] 
            bg-black/80 border border-black justify-center gap-2 flex flex-col 
            text-white text-pretty rounded-r-2xl max-[800px]:rounded-t-none 
            max-[800px]:rounded-b-2xl max-[800px]:border-l font-bold 
            backdrop-blur-md text-shadow-indigo-200 text-xl p-4"
          >
            {/* TITLE */}
            <span className="text-3xl">{movie.title}</span>
            <div className="flex">
              {/* RELEASE DATE */}
              <span className="place-content-end flex gap-1 w-fit rounded-4xl py-1 pr-4 ">
                <Calendar className={`self-center w-5`} />
                <span className="">{movie.release_date.slice(0, -6)}</span>
              </span>

              {/* RUNTIME */}
              <span className="place-content-end flex gap-1 w-fit rounded-4xl py-1 pr-4">
                <Clock className={`self-center w-5`} />
                {`${hours}h ${minutes}m`}
              </span>

              {/* RAITING */}
              <span className="text-[#ffc400] self-center font-bold border w-fit text-shadow-black px-2 py-.5 rounded-full bg-[#5e0e0e]">
                {`★ ${movie.vote_average.toString().slice(0, 3)}`}
              </span>
            </div>

            {/* GENRER */}
            <div className="flex pl-0 p-2 flex-wrap gap-2">
              {movie.genres.map((genre) => {
                console.log('This is the genres', genre.name);
                return (
                  <span
                    className="px-3 py-1 text-[#000000]
                      rounded-4xl bg-linear-to-t from-[#10a372] via-[#64faff] to-[#3dffc2]
                    "
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>
            <p className="text-gray-100 ">{movie.overview}</p>

            {/* <div className="bg-emerald-800">
              {movie.production_companies.map((e) => (
                <div key={e.id}>{e.name}</div>
              ))}
            </div> */}

            {/* <div className="flex flex-col gap-1 pt-4">
              <span className="text-[#ffee00]">Budget ${budget}M</span>
              <span className="text-[#05d832]">Revenue ${revenue}M</span>
              <span>Earnings ${earnings}M</span>
            </div> */}

            <Link
              href={movie.homepage}
              className="text-amber-500 mt-2 w-full hover:tracking-wider transition-all duration-300"
            >
              Watch here
            </Link>
          </section>
        </div>
      </section>
    </div>
  );
}

/*
Ska kunna ta bort filmer man inte är intresserad av -> delete knapp
som lägger till filmens id i en array och sen filtrerar filmer med arrayen
så man bara ser filmer som INTE ligger i arrayen.
*/

// Ta bort alla branches lokalt (förutom main och dev)
// git branch | grep -vE "main|dev" | xargs git branch -D
