import { useEffect, useRef, useState } from 'react';
import { Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Movie } from '../../model/Movie';
import { MovieService } from '../../model/MovieService';
import debounce from '../../utils/debounce';

interface SearchFormProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const SearchForm = ({ setLoading, setMovies }: SearchFormProps) => {
  const feedback = false;
  const isFormValidated = false;
  const queryError = '';
  const searchError = '';

  const MIN_QUERY_LENGTH = 3;
  const [queryText, setQueryText] = useState<string>('');

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value);
  };

  const debouncedSearch = useRef(debounce(async (query: string) => {
    if (query.length >= MIN_QUERY_LENGTH) {
      setLoading(true);
      const movies = await MovieService.searchMovies(query);
      setMovies(movies);
      setLoading(false);
    }
  }));

  useEffect(() => {
    debouncedSearch.current(queryText);
  }, [queryText]);

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card className="login">
            <Card.Header>
              <Card.Title as="h4">Film keresése</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={isFormValidated}>
                <Row>
                  <Col md="12">
                    <Form.Group controlId="movie-query-field">
                      <Form.Label>Keresett film:</Form.Label>
                      <Form.Control
                        isInvalid={!!queryError}
                        onChange={onQueryChange}
                        required
                        value={queryText}
                        placeholder="Minimum három karakter..."
                      />
                      {feedback && (
                        <Form.Control.Feedback type="invalid">
                          {queryError}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              {searchError && <Alert variant="danger">{searchError}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchForm;
