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
    <>
      <div className="flex justify-center">
        <Image src={`${TMDB_IMAGE_BASE}/${movie.poster_path}`} alt={`${movie.title}`} height={300} width={300}></Image>
        <p className="p-4 flex text-center place-self-center w-[20rem]">{movie.overview}</p>
      </div>
      <h1 className="bg-amber-500 text-center text-5xl p-4 border border-white text-black font-bold">{movie.title}</h1>
      <Image
        className="w-full"
        src={`${TMDB_IMAGE_BASE}/${movie.backdrop_path}`}
        alt={`${movie.title}`}
        height={300}
        width={300}
      ></Image>
    </>
  );
}
