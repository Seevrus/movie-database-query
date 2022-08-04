import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Movie } from '../../model/Movie';
import { MovieService } from '../../model/MovieService';

interface SearchFormProps {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const SearchForm = ({ setMovies }: SearchFormProps) => {
  const feedback = false;
  const isFormValidated = false;
  const queryError = '';
  const searchError = '';

  const [queryText, setQueryText] = useState<string>('');

  const onSearch = async () => {
    const movies = await MovieService.searchMovies(queryText);
    setMovies(movies);
  };

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taxNumberInput = e.target.value;
    setQueryText(taxNumberInput);
  };

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
                      />
                      {feedback && (
                        <Form.Control.Feedback type="invalid">
                          {queryError}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Button onClick={onSearch} variant="primary">
                  Keresés
                </Button>
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
