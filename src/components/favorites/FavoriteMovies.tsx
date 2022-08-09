import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Movie } from '../../model/Movie';

interface FavoriteMovieProps {
  favoriteMovies: Movie[];
  focusedMovie?: Movie | undefined;
  setFocusedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

const FavoriteMovies = ({ favoriteMovies, focusedMovie, setFocusedMovie }: FavoriteMovieProps) => {
  const handleClick = (m: Movie, isFocused:boolean) => {
    if (isFocused) {
      setFocusedMovie(undefined);
    } else {
      setFocusedMovie(m);
    }
  };

  if (favoriteMovies.length === 0) return <></>;

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card className="login">
            <Card.Header>
              <Card.Title as="h4">Kedvencek</Card.Title>
            </Card.Header>
            <Card.Body>
                {favoriteMovies.map((movie) => {
                  const isMovieFocused = movie.id === focusedMovie?.id;
                  return (
                    <Button
                      variant={isMovieFocused ? 'primary' : 'light'}
                      key={movie.id}
                      onClick={() => handleClick(movie, isMovieFocused)}
                    >
                      {movie.title}
                    </Button>
                  );
                })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FavoriteMovies;
