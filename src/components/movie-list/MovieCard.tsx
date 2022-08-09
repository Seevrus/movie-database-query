import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { MovieListContext } from './MovieListContext';
import { Movie } from '../../model/Movie';

import './movie-card.css';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { configuration, favoriteMovies, setFavoriteMovies } = useContext(MovieListContext);
  const hasImage = !!configuration.size && !!movie.posterPath;
  const imgUrl = hasImage
    ? configuration.baseUrl + '/' + configuration.size + '/' + movie.posterPath
    : '';

  const addMovieToFavorites = (m: Movie) => {
    setFavoriteMovies?.([
      ...favoriteMovies,
      m,
    ]);
  };

  const isMovieFavorite = (m: Movie) => {
    return favoriteMovies.findIndex((m2) => m.id === m2.id) !== -1;
  };

  const removeFromFavorites = (m: Movie) => {
    setFavoriteMovies?.(favoriteMovies.filter((m2) => m.id !== m2.id));
  };

  return (
    <MDBCard style={{ maxWidth: '1280px' }}>
      <MDBRow className='g-0'>
        <MDBCol md='3'>
          <MDBCardImage src={imgUrl} alt={`Poster of ${movie.title}`} fluid />
        </MDBCol>
        <MDBCol md='9'>
          <MDBCardBody>
            <MDBCardTitle>{movie.title}</MDBCardTitle>
            <MDBCardText>
              {movie.overview}
            </MDBCardText>
            <MDBCardText>
              <small className='text-muted'>{movie.releaseDate}</small>
            </MDBCardText>
            {isMovieFavorite(movie)
              ? <Button
                  onClick={() => removeFromFavorites(movie)}
                >Eltávolítás a kedvencek közül</Button>
              : <Button
                  variant="light"
                  onClick={() => addMovieToFavorites(movie)}
                >Kedvencek közé</Button>
            }
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
};
