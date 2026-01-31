import Image from 'next/image';
// import Header from '../components/header';
import { fetchTMDB } from '../lib/tmdb';
import { Movie } from '@/types/tmdb';

export default async function Home() {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const data = await fetchTMDB<Movie>('/movie/top_rated');
  console.log(data);

  return (
    <>
      <div>
        {data.results.map((movie) => (
          <div key={movie.id}>
            <Image
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.original_title}
              width={500}
              height={500}
            ></Image>
            <h2>{movie.title}</h2>
            <p>{movie.vote_average}</p>
          </div>
        ))}
      </div>
    </>
  );
}
