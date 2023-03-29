import React from 'react';

// Custom components imports
import MovieItem from '../MovieItem/MovieItem';

// Styles imports
import styles from './MoviesList.module.css';

const MoviesList = ({movies, selectedPage}) => {

  const moviesList = movies.filter(movie => movie.pagination.page === selectedPage);
  
  return (
    <div className={styles.container} >
        <ul className={styles.grid} >
            {
                moviesList.map(movie => {
                    return <MovieItem key={movie.id} movie={movie} />
                })
            }
        </ul>
    </div>
  )
}

export default MoviesList;