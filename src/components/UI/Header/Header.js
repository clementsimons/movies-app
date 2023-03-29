import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchMoviesData } from "../../../store/movie-actions";
import { movieActions } from "../../../store/movie-slice";

import TitleFilter from "../../Movies/MoviesFilters/TitleFilter/TitleFilter";
import YearOrderFilter from "../../Movies/MoviesFilters/YearOrderFilter/YearOrderFilter";
import YearRangeFilter from "../../Movies/MoviesFilters/YearRangeFilter/YearRangeFilter";

// Styles imports
import styles from "./Header.module.css";

const Header = () => {

    let location = useLocation().pathname;
    const dispatch = useDispatch();
    const movieTitleFilter = useSelector(state => state.movie.movieTitleFilter);
    const selectedFilter = useSelector(state => state.movie.filterByYearType);
    const allItems = useSelector(state => state.movie.allItems);

    const handleFilterByYearSelect = (event) => {
        dispatch(movieActions.updateFilterByYearType({filterByYearType: event.target.value}));
        if( event.target.value === "No filter" ){
            dispatch(fetchMoviesData({ title: movieTitleFilter }));
        }
    };

    return (
        <header 
            className={styles.container}
        >
            {
                location === "/" ?
                <>
                    <div className={styles.filters} >
                        <TitleFilter placeholder="Movie title" />
                        <div className={styles["filters-select-container"]} >
                            <label className={styles["select-label"]} htmlFor="filters-select">Filter by date:</label>
                            <select name="filters-select" id="filters-select" onChange={handleFilterByYearSelect} defaultValue={selectedFilter} >
                                <option >No filter</option>
                                {   allItems &&
                                    <>
                                        <option >Order chronologically</option>
                                        <option >Order by year range</option>
                                    </>
                                }
                            </select>
                        </div>
                        {
                            allItems && selectedFilter === "Order chronologically" &&
                            <YearOrderFilter />
                        }
                        {
                            allItems && selectedFilter === "Order by year range" &&
                            <YearRangeFilter />
                        }
                    </div>
                    <div className={styles["go-to-favorites-list"]} ><NavLink to="/favorites-list" >Favorites list</NavLink></div>
                </>
                :
                <div className={styles["back-to-movies"]} ><NavLink to="/" end >Back to movies list</NavLink></div>
            }
        </header>
    )
}

export default Header;