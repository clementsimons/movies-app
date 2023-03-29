import React from 'react';

// Styles imports
import styles from './Pagination.module.css';

const Pagination = ({selectedPage, totalPages, setSelectedPage}) => {

    const arrowClickHandler = (event) => {
        if (event.target.className === "backward" && selectedPage > 1) {
            setSelectedPage(previousSelectedPage => previousSelectedPage - 1);
        }
        if (event.target.className === "frontward" && selectedPage < totalPages) {
            setSelectedPage(previousSelectedPage => previousSelectedPage + 1);
        }
    };

    return (
        <div className={styles.container} >
            <div className={styles.buttons} >
                <button className='backward' onClick={arrowClickHandler} >{"<"}</button>
                <div className={styles["pages-display"]} >{`${selectedPage} / ${totalPages}`}</div>
                <button className='frontward' onClick={arrowClickHandler} >{">"}</button>
            </div>
        </div>
    )
}

export default Pagination;