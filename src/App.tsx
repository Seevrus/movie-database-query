import SearchForm from './components/search/SearchForm';
import { Movies } from './model/Movies';

const App = () => {
  const movies = new Movies();

  return <SearchForm movies={movies} />;
};

export default App;
