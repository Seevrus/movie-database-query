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

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const configuration = useContext(ConfigurationContext);
  const imgUrl = configuration.baseUrl + '/' + configuration.size + '/' + movie.posterPath;

  return (
    <MDBCard style={{ maxWidth: '1440px' }}>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src={imgUrl} alt={`Poster of ${movie.title}`} fluid />
        </MDBCol>
        <MDBCol md='8'>
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
