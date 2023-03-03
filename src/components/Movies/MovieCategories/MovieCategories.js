import React, { useContext } from "react";

// Context
import MoviesContext from "../../../contexts/movies-context/movies-context";

// Custom components
import MultipleSelect from "../../UI/MultipleSelect/MultipleSelect";

// Style imports
import styles from "./MovieCategories.module.css";
import checkedIcon from "../../../assets/icons/checked.svg";

const MovieCategories = () => {

    const moviesContext = useContext(MoviesContext)

    const optionClickHandler = (category) => {
        const newCategories = 
            moviesContext.selectedCategories.includes(category) ? 
            moviesContext.selectedCategories.filter(categoryFromContext => categoryFromContext !== category)
            : [ ...moviesContext.selectedCategories, category ]
        moviesContext.setSelectedCategories(newCategories);
    }

    return (
        <>
            <div className={styles["movie-categories"]} >
                <MultipleSelect options={moviesContext.categories} selectedOptions={moviesContext.selectedCategories} optionClickHandler={optionClickHandler} />
                {
                    moviesContext.selectedCategories.map((selectedCategory, index) => {
                        return <div key={index} className={styles["selected-category"]} > 
                            <p>{selectedCategory}</p>
                            <img src={checkedIcon} alt="checked" />
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default MovieCategories;