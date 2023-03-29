import { useDispatch, useSelector } from 'react-redux';
import { sortMoviesByYear } from '../../../../store/movie-actions';
import { movieActions } from '../../../../store/movie-slice';

import styles from "./YearOrderFilter.module.css";
import chevronUpIcon from "../../../../assets/chevron-up.svg";
import chevronDownIcon from "../../../../assets/chevron-down.svg";

const YearOrderFilter = () => {

    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.items);
    const orderByYear = useSelector(state => state.movie.orderByYear);

    const sortMovies = () => {
        const newOrder = orderByYear === "" ? "asc" : orderByYear === "asc" ? "desc" : "asc"
        dispatch(movieActions.updateOrderByYear(newOrder));
        dispatch(sortMoviesByYear(movies, newOrder));
    };

    return (
        <div className={styles.container} >
            <div className={styles["sort-movies"]} >
                <div className={styles["sort-movies-text"]} onClick={sortMovies} ><p>Sort movies chronologically:</p></div>
                {
                    orderByYear === "" ? null :
                    orderByYear === "asc" ?
                    <img className={styles["chevron-down"]} src={chevronDownIcon} alt="chevron-down" />
                    :
                    <img className={styles["chevron-up"]} src={chevronUpIcon} alt="chevron-up" />
                }
            </div>
        </div>
    )
};

export default YearOrderFilter;