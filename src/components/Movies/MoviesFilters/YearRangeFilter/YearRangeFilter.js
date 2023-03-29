import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortMoviesByYearRange } from '../../../../store/movie-actions';

import styles from "./YearRangeFilter.module.css";

const YearRangeFilter = () => {

    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.items);
    const [yearRange, setYearRange] = useState([]);

    const handleYearRangeChange = (event) => {
        let newYearRange = [ ...yearRange ];
        if(event.target.className === "from"){
            newYearRange[0] = event.target.value;
            setYearRange(newYearRange);
        }
        if(event.target.className === "to"){
            newYearRange[1] = event.target.value;
            setYearRange(newYearRange);
        }
    };
    
    const updateMoviesListHandler = () => {
        dispatch(sortMoviesByYearRange(movies, yearRange));
    }

    return (
        <div className={styles.container} >
            <div className={styles["year-range-filter"]} >
                <div>Sort movies by year range:</div>
                <input className='from' type="text" onChange={handleYearRangeChange} />
                <input className='to' type="text" onChange={handleYearRangeChange} />
                <button onClick={updateMoviesListHandler} >Search</button>
            </div>
        </div>
    )
}

export default YearRangeFilter