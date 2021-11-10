import React from 'react';
import styles from "./index.module.scss";

const Navbar = () => {
    return (
        <div class={styles.navigationWrapper}>
            <div class={styles.navigationItems}>
                <a href="#">Our animals</a>
                <a href="#">Accessories</a>
                <a href="#">About us</a>
                <a href="#">Shopping cart</a>
            </div>
        </div>
    )
}

export default Navbar;
