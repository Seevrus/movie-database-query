import { Container, Row } from 'react-bootstrap';
import { Movie } from '../../model/Movie';
import Loading from '../loading/Loading';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  isLoading: boolean;
  movies: Movie[];
}

export const MovieList = ({ isLoading, movies }: MovieListProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-lg-center">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </Row>
    </Container>
  );
};
