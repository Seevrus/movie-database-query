import { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { MovieService } from '../../model/MovieService';
import { MoviePagesT } from '../../types/movie-pages';
import debounce from '../../utils/debounce';

interface SearchFormProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  movies: MoviePagesT;
  setMovies: React.Dispatch<React.SetStateAction<MoviePagesT>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setNumberOfPages: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm = ({
  setLoading,
  movies,
  setMovies,
  activePage,
  setActivePage,
  setNumberOfPages,
}: SearchFormProps) => {
  const MIN_QUERY_LENGTH = 3;
  const [queryText, setQueryText] = useState<string>('');

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value);
  };

  const debouncedSearch = useRef(debounce(
    async (query: string, page: number, movieState: MoviePagesT) => {
      if (query.length >= MIN_QUERY_LENGTH) {
        setLoading(true);
        const movieSearchResult = await MovieService.searchMovies(query, page);
        setMovies({
          ...movieSearchResult,
          movies: new Map(movieState.movies).set(page, movieSearchResult.movies),
        });
        setActivePage(page);
        setNumberOfPages(movieSearchResult.pages);
        setLoading(false);
      }
    },
  ));

  useEffect(
    () => {
      if (movies.query !== queryText || !movies.movies.has(activePage)) {
        debouncedSearch.current(queryText, activePage, movies);
      }
    },
    [activePage, movies, queryText],
  );

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card className="login">
            <Card.Header>
              <Card.Title as="h4">Film keresése</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form noValidate>
                <Row>
                  <Col md="12">
                    <Form.Group controlId="movie-query-field">
                      <Form.Label>Keresett film:</Form.Label>
                      <Form.Control
                        onChange={onQueryChange}
                        required
                        value={queryText}
                        placeholder="Minimum három karakter..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchForm;
