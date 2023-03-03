import React, { useState, useEffect, useRef } from "react";

// Styles imports
import styles from "./MultipleSelect.module.css";
import downChevronIcon from "../../../assets/icons/chevron-down.svg";
import checkedIcon from "../../../assets/icons/checked.svg";

const MultipleSelect = ({
    options,
    selectedOptions,
    optionClickHandler
}) => {

    const [optionsAreHidden, setOptionsAreHidden] = useState(true);
    const node = useRef()

    useEffect(() => {
        // add when mounted
        document.addEventListener("click", handleClick)
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const handleClick = (event) => {
        if (node.current) {
            if( (!node.current.contains(event.target) && event.target.className !== styles.option) ){
                setOptionsAreHidden(true);
            }
            if ( event.target.className === styles.option )
            {
                setOptionsAreHidden(false);
            }
        } else {
            return null
        }
    }

    return (
        <div ref={node} className={styles["multiple-select"]} >
            <div className={styles["select-label"]} onClick={() => setOptionsAreHidden(!optionsAreHidden)} > <p>Categories:</p> <img src={downChevronIcon} alt="chevronz" /> </div>
            <div className={`${styles["select-options"]} ${optionsAreHidden ? "" : styles.open}`}>
                {
                    options.map((option, index) => {
                        return optionsAreHidden ? null :
                        <div key={index} className={styles["select-option-and-checked-icon"]} onClick={() => optionClickHandler(option)} >
                            <div className={styles.option} >{option}</div>
                            {
                                selectedOptions.includes(option) &&
                                <img src={checkedIcon} alt="checked" />
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MultipleSelect;