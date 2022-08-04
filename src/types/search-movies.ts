export type MovieResult = {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string;
  popularity?: string;
  vote_count?: string;
  video?: boolean;
  vote_average?: number;
};

export type SearchMoviesResponseT = {
  page?: number;
  results?: MovieResult[];
  total_results?: number;
  total_pages?: number;
};
