import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getItem } from "../../store/movie-actions";
import { movieActions } from "../../store/movie-slice";
import { favoriteActions } from "../../store/favorite-slice";

import styles from "./MovieDetails.module.css";
import noImageIcon from "../../assets/no-image.svg";
import starIcon from "../../assets/star.svg";

const MovieDetailsPage = () => {
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movie.item);
    const favoriteItems = useSelector(state => state.favorite.items);
    const isAddedToFavoriteItems = favoriteItems.map(item => item.id).includes(id);

    useEffect(() => {
        dispatch(getItem({ id: id }));
        return () => { 
            dispatch(movieActions.updateItem({item: null}))
        };
    }, [dispatch, id])

    const addToFavoriteHandler = () => {
        dispatch(favoriteActions.addToFavoriteItems(movie));
    };

    return (
        <>
            {
                movie ?
                <div className={styles.container} >
                    <div className={styles.card} >
                        <div className={styles.poster} > <img src={ movie.poster === "N/A" ? noImageIcon : movie.poster } alt="poster" /> </div>
                        <div className={styles.details} >
                            <div className={styles.title} >{movie.title}</div>
                            <div className={styles.year} ><span>Year: </span>{movie.year}</div>
                            <div className={styles.plot} ><span>Plot: </span>{movie.plot}</div>
                            <div className={styles.director} ><span>Director: </span>{movie.director}</div>
                            <div className={styles.actors} ><span>Actors: </span>{movie.actors}</div>
                            <div className={styles.favorite} ><button className={isAddedToFavoriteItems ? styles.active : null} onClick={addToFavoriteHandler} ><img src={starIcon} alt="star" /> <p>{`${isAddedToFavoriteItems ? "Added to favorite" : "Add to favorite"}`}</p></button></div>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.loading} ><p>Loading data...</p></div>
            }
        </>
    )
}

export default MovieDetailsPage;