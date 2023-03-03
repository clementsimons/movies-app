import React, { useContext } from "react";

// Context
import MoviesContext from "../../../contexts/movies-context/movies-context";

// Custom components
import MovieItem from "../MovieItem/MovieItem";

// Styles imports
import styles from "./MoviesList.module.css";

const MoviesList = () => {

    const moviesContext = useContext(MoviesContext)
    const movies = moviesContext.filteredItems

    return (
        <div className={styles.container} >
            <ul className={styles.grid} >
                {
                    movies.map(movie => {
                        return <MovieItem key={movie.id} movie={movie} />
                    })
                }
            </ul>
        </div>
    )
}

export default MoviesList;