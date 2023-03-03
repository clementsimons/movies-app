// Provider
import MoviesProvider from './contexts/movies-context/MoviesProvider';

// Custom components imports
import Header from './components/UI/Header/Header';
import MovieCategories from "./components/Movies/MovieCategories/MovieCategories";
import MoviesList from './components/Movies/MoviesList/MoviesList';
import Pagination from './components/UI/Pagination/Pagination';

// Styles imports
import './App.css';

const App = () => {
    return (
        <MoviesProvider>
            <Header>
                <MovieCategories />
            </Header>
            <MoviesList />
            <Pagination />
        </MoviesProvider>
    );
}

export default App;
