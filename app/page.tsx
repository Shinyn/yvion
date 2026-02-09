// import Image from 'next/image';
import { fetchTMDB } from '../lib/tmdb';
import { Movie } from '@/types/tmdb';
import { Card } from '@/components/card';
import { Header } from '@/components/header';

import { TMDB_IMAGE_BASE } from '@/lib/constants';
import Image from 'next/image';

export default async function Home() {
  const data = await fetchTMDB<Movie>('/movie/top_rated');
  console.log(data);

  return (
    <>
      <Header key={data.results[0].id} {...data} />
      <main className="main">
        {data.results.map((movie) => (
          <Card key={movie.id} {...movie} />
        ))}
      </main>
    </>
  );
}

/*
      Detta vi ska ha med

      backdrop_path: '/6aNKD81RHR1DqUUa8kOZ1TBY1Lp.jpg',
      id: 637,
      overview: 'A touching story of an Italian book seller of Jewish ancestry who lives in his own little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II. 
        While locked up he tries to convince his son that the whole thing is just a game.',
      poster_path: '/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg',
      release_date: '1997-12-20',
      title: 'Life Is Beautiful',
*/
