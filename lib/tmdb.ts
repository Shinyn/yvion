import { Movie, TMDBResponse } from '@/types/tmdb';
import { TMDB_API_BASE } from '@/lib/constants';
const TOKEN = process.env.TMDB_TOKEN;

export async function fetchTMDB<T>(endpoint: string): Promise<TMDBResponse<T>> {
  const response = await fetch(`${TMDB_API_BASE}${endpoint}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    // cache: 'no-store',
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error('TMDB request failed');
  }
  return response.json();
}

export async function fetchTMDBItem(endpoint: string): Promise<Movie> {
  const response = await fetch(`${TMDB_API_BASE}${endpoint}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    const text = await response.text();
    console.error(text);
    throw new Error('TMDB request failed');
  }

  return response.json();
}
