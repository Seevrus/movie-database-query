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
import { ConfigurationContext } from '../../App';
import { Movie } from '../../model/Movie';

import './movie-card.css';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const configuration = useContext(ConfigurationContext);
  const hasImage = !!configuration.size;
  const imgUrl = hasImage
    ? configuration.baseUrl + '/' + configuration.size + '/' + movie.posterPath
    : '';

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
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
};
