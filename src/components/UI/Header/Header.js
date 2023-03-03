import React from "react";

// Styles imports
import styles from "./Header.module.css";

const Header = ({
    children,
    style
}) => {

    return (
        <div 
            className={styles.container}
            style={style}
        >
            {children}
        </div>
    )
}

export default Header;