import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../../store/favorite-slice';

// Custom components imports
import Card from '../../UI/Card/Card';

// Styles imports
import styles from './MovieItem.module.css';
import noImageIcon from "../../../assets/no-image.svg";
import crossIcon from "../../../assets/cross.svg";

const MovieItem = ({ movie }) => {

    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const allItems = useSelector(state => state.movie.allItems);
    
    const removeItemHandler = () => {
        dispatch(favoriteActions.removeFromFavoriteItems(movie.id));
    };

    return (
        <Card>
                <div className={`${styles.container} ${ allItems ? "" : styles.inactive}`}>
                    { 
                        location === "/favorites-list" && 
                        <button className={styles.remove} onClick={removeItemHandler} ><img src={crossIcon} alt="cross" /></button>
                    }
                    <Link to={allItems ? `/movie-details/${movie.id}` : "#"} >
                        <div className={styles.thumbnail} >
                            {
                                movie.poster === "N/A" ?
                                    <img src={noImageIcon} alt="" />
                                    :
                                    <img src={movie.poster} alt="poster" />
                            }
                        </div>
                        <div className={styles.title} >{movie.title}</div>
                        <div className={styles.year} >{movie.year}</div>
                    </Link>
                </div>
            </Card>
    )
}

export default MovieItem;