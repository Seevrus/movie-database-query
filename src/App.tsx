import { useState } from 'react';
import SearchForm from './components/search/SearchForm';
import { Movie } from './model/Movie';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);

  return <SearchForm setMovies={setMovies} />;
};

export default App;
