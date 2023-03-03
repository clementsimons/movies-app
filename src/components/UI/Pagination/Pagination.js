import React, { useContext } from "react";

// Context
import MoviesContext from "../../../contexts/movies-context/movies-context";

// Styles imports
import styles from "./Pagination.module.css";

const Pagination = () => {

    const moviesContext = useContext(MoviesContext);
    const displayPagesButton = moviesContext.totalPages > 1;

    const arrowClickHandler = (event) => {
        if(event.target.className === "back" && moviesContext.selectedPage > 1){
            moviesContext.setSelectedPage(previousSelectedPage => previousSelectedPage - 1);
        }
        if(event.target.className === "front" && moviesContext.selectedPage < moviesContext.totalPages){
            moviesContext.setSelectedPage(previousSelectedPage => previousSelectedPage + 1);
        }
    };

    const maximumNumberSelectHandler = (event) => {
        moviesContext.setMaxItems(event.target.value)
        moviesContext.setSelectedPage(1);
    };

    return (
        <div className={styles["container"]} >
            <div className={styles["buttons"]} >
                {displayPagesButton && <button className="back" onClick={arrowClickHandler} >{"<"}</button>}
                <div className={styles["pages-display"]} >{`${moviesContext.selectedPage} / ${moviesContext.totalPages}`}</div>
                {displayPagesButton && <button className="front" onClick={arrowClickHandler} >{">"}</button>}
            </div>
            <div className={styles["select-container"]} >
                <label className={styles["select-label"]} htmlFor="pagination">Movies to display:</label>
                <select name="pagination" id="pagination" onChange={maximumNumberSelectHandler} defaultValue={4} >
                    <option >4</option>
                    <option >8</option>
                    <option >12</option>
                </select>
            </div>
        </div>
    )
}

export default Pagination;