import { Movie } from '../model/Movie';

export const defaultMoviePagesState = {
  query: '',
  pages: 0,
  movies: new Map(),
};

export type MoviePagesT = {
  query: string;
  pages: number;
  movies: Map<number, Movie[]>;
};
