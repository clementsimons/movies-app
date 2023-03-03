import React, { useContext } from "react";
import Card from "../../UI/Card/Card";

// Context
import MoviesContext from "../../../contexts/movies-context/movies-context";

// Styles imports
import styles from "./MovieItem.module.css";
import likeIcon from "../../../assets/icons/like.svg";
import dislikeIcon from "../../../assets/icons/dislike.svg";
import closeIcon from "../../../assets/icons/close.svg";

const MovieItem = ({
    movie
}) => {

    const likesPercentage = Math.ceil((movie.likes / (movie.dislikes + movie.likes)) * 100);
    const dislikesPercentage = 100 - likesPercentage;
    const touched = movie.touched
    const defaultButtonStyle = { filter: "invert(99%) sepia(3%) saturate(785%) hue-rotate(216deg) brightness(117%) contrast(89%)" }
    const likesButtonStyle = { filter: "invert(48%) sepia(95%) saturate(639%) hue-rotate(125deg) brightness(97%) contrast(98%)" }
    const dislikesButtonStyle = { filter: "invert(28%) sepia(80%) saturate(3760%) hue-rotate(340deg) brightness(98%) contrast(84%)" }

    const moviesContext = useContext(MoviesContext);

    const deleteMovieHandler = () => {
        const updatedMovies = moviesContext.items.filter(item => item.id !== movie.id);
        moviesContext.setMovies(updatedMovies);
    }

    const likesHandler = (likesType) => {
        const opposite = likesType === "likes" ? "dislikes" : "likes"
        const newMovies = moviesContext.items.map(previousMovie => {
            if( previousMovie.id === movie.id ){
                return {
                    ...movie,
                    touched: likesType,
                    [likesType]: movie.touched !== likesType ? movie[likesType] + 1 : movie[likesType],
                    [opposite]: (movie.touched && movie.touched === opposite) ? movie[opposite] - 1 : movie[opposite]
                }
            } else { return { ...previousMovie } }
        })
        moviesContext.setMovies(newMovies)
    }

    return <Card>
        <div className={styles["rotating-item"]} >

            <div className={`${styles["item-side"]} ${styles.back}`}>
                <div className={styles["likes-dislikes-container"]}>
                    <button className={styles.delete} onClick={deleteMovieHandler} > <img src={closeIcon} alt="close" /> </button>
                    <div className={`${styles.likes} likes`} onClick={() => likesHandler("likes")} >
                        <img className="likes" style={ touched === "likes" ? likesButtonStyle : defaultButtonStyle } src={likeIcon} alt="like" />
                        <div className={`${styles["likes-number"]} likes`} style={ touched === "likes" ? { color: "#02c39a" } : { color: "#f1f1f1" } } >{movie.likes}</div>
                    </div>
                    <div className={`${styles.dislikes} dislikes`} onClick={() => likesHandler("dislikes")} >
                        <img className="dislikes" style={ touched === "dislikes" ? dislikesButtonStyle : defaultButtonStyle } src={dislikeIcon} alt="dislike" />
                        <div className={`${styles["dislikes-number"]} dislikes`} style={ touched === "dislikes" ? { color: "#e63946" } : { color: "#f1f1f1" } } >{movie.dislikes}</div>
                    </div>
                </div>
                <div className={styles["ratio-container"]}>
                    <div className={styles["like-ratio"]} style={{ width: `${likesPercentage}%` }} ></div>
                    <div className={styles["dislike-ratio"]} style={{ width: `${dislikesPercentage}%` }} ></div>
                </div>
            </div>

            <div className={`${styles["item-side"]} ${styles.front}`}>
                <div className={styles.title} >{movie.title}</div>
                <div className={styles.category} >{movie.category}</div>
            </div>
        </div>
    </Card>
}

export default MovieItem;