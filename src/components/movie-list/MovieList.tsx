import { Container, Row } from 'react-bootstrap';
import { Movie } from '../../model/Movie';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  movies: Movie[];
}

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <Container fluid>
      <Row className="justify-content-lg-center">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </Row>
    </Container>
  );
};
