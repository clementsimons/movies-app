import React from 'react'
import { useSelector } from 'react-redux';

import MovieItem from '../../Movies/MovieItem/MovieItem';

import styles from "./FavoriteList.module.css";

const FavoriteList = () => {

    const favoriteList = useSelector(state => state.favorite.items);

    return (
        <div className={styles.container} >
        <ul className={styles.grid} >
            {
                favoriteList.map(movie => {
                    return <MovieItem key={movie.id} movie={movie} />
                })
            }
        </ul>
    </div>
    )
}

export default FavoriteList;