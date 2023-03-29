import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesData } from '../../store/movie-actions';

// Custom hook
import usePagination from '../../hooks/use-pagination';

// Custom components imports
import MoviesList from '../../components/Movies/MoviesList/MoviesList';
import Pagination from '../../components/UI/Pagination/Pagination';
import Error from '../../components/UI/Error/Error';

import styles from './Home.module.css';

const HomePage = () => {

    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.items);
    const sortedItems = useSelector(state => state.movie.sortedItems);
    const error = useSelector(state => state.ui.error);
    const allItems = useSelector(state => state.movie.allItems);
    const { paginateListItems, paginatedItems: paginatedMovies, setSelectedPage, selectedPage, totalPages } = usePagination();

    useEffect(() => {
        dispatch(fetchMoviesData());
    }, [dispatch]);

    useEffect(() => {
        paginateListItems(movies);
    }, [paginateListItems, movies]);

    useEffect(() => {
        paginateListItems(sortedItems);
    }, [paginateListItems, sortedItems]);

    return <>
        {
            error ?
            <Error message={error.message} /> 
            :
            <>
                { !allItems && <div className={styles.loading} >Loading all results...</div> }
                <MoviesList movies={paginatedMovies} selectedPage={selectedPage} />
                {
                    allItems ?
                    <Pagination selectedPage={selectedPage} totalPages={totalPages} setSelectedPage={setSelectedPage} />
                    : <div className={styles.loading} >Loading all results...</div>
                }
            </>
        }
    </>
}

export default HomePage;