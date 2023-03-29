// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesData } from "../../../../store/movie-actions";

// Styles imports
import styles from "./TitleFilter.module.css";
import searchIcon from "../../../../assets/search.svg";
import { movieActions } from "../../../../store/movie-slice";

const TitleFilter = ({
    placeholder = "placeholder"
}) => {

    const dispatch = useDispatch();
    const movieTitleFilter = useSelector(state => state.movie.movieTitleFilter);

    const onChangeHandler = (event) => {
        dispatch(movieActions.updateMovieTitleFilter(event.target.value));
    };

    const searchHandler = (event) => {
        if( event.type === "click" || (event.type === "keydown" && event.key === "Enter") ){
            if(movieTitleFilter){
                dispatch(fetchMoviesData({ title: movieTitleFilter }));
            } else {
                dispatch(fetchMoviesData());
            }
            dispatch(movieActions.updateFilterByYearType({filterByYearType: ""}));
        }
    };

    return (
        <div className={styles.container} >
            <div className={styles["search-input"]} >
                <label htmlFor="search" >Search by title:</label>
                <input type="text" id="search" name="search" placeholder={placeholder} onChange={onChangeHandler} onKeyDown={searchHandler} defaultValue={""} />
                <img className={styles["search-icon"]} src={searchIcon} alt="search" onClick={searchHandler} />
            </div>
        </div>
    )
}

export default TitleFilter