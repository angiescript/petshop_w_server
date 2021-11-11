import React from 'react';
import styles from "./index.module.scss";

const Navbar = () => {
    return (
        <div class={styles.navigationWrapper}>
            <div class={styles.navigationItems}>
                <p>Our animals</p>
                <p>Accessories</p>
                <p>About us</p>
                <p>Shopping cart</p>
            </div>
        </div>
    )
}

export default Navbar;
