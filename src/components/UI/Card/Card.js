import React from "react";

// Styles imports
import styles from "./Card.module.css";

const Card = ({
    children,
    style
}) => {
  return (
    <div className={styles.container} style={style} >
        {children}
    </div>
  )
}

export default Card;