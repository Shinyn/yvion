export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];

  homepage: string;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  release_date: string;
  revenue: number;
  runtime: number;

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];

  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  display_priority: number;
}

export interface WatchProviderResponse {
  id: number;
  results: Record<string, CountryWatchProviders>;
}

export interface CountryWatchProviders {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for: MoviePreview[];
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface MoviePreview {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export interface TVShow {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface HeaderProps {
  data: {
    page: number;
    results: CardItem[];
    total_pages: number;
    total_results: number;
  };
}

export interface PaginationProps {
  page: number;
  results: CardItem[];
  total_pages: number;
  total_results: number;
}

export interface HomeProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
    decade?: string;
    sort?: string;
  }>;
}

export interface CardItem {
  id: number;
  poster_path: string | null;
  vote_average: number;
  title?: string;
  name?: string;
  backdrop_path?: string | null;
}
