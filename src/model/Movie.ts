import { MovieResult } from '../types/search-movies';

export class Movie {
  id?: number;

  title?: string;

  originalTitle?: string;

  posterPath?: string | null;

  isAdult?: boolean;

  genreIds?: number[];

  overview?: string;

  popularity?: number;

  voteAverage?: number;

  voteCount?: number;

  releaseDate?: string;

  originalLanguage?: string;

  video?: boolean;

  backdropPath?: string;

  constructor(movieData: MovieResult) {
    this.id = movieData.id;
    this.title = movieData.title;
    this.originalTitle = movieData.original_title;
    this.posterPath = movieData.poster_path;
    this.isAdult = movieData.adult;
    this.genreIds = movieData.genre_ids;
    this.overview = movieData.overview;
    this.popularity = movieData.popularity;
    this.voteAverage = movieData.vote_average;
    this.voteCount = movieData.vote_count;
    this.releaseDate = movieData.release_date;
    this.originalLanguage = movieData.original_language;
    this.video = movieData.video;
    this.backdropPath = movieData.backdrop_path;
  }
}
