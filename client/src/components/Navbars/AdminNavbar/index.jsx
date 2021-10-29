import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import { ReactComponent as HomeBlack } from "../../../assets/icons/home_black.svg";
import { ReactComponent as AddBlack } from "../../../assets/icons/add_black.svg";
import { ReactComponent as ShoppingCartBlack } from "../../../assets/icons/shopping_cart_black.svg";
import { ReactComponent as ArticleBlack } from "../../../assets/icons/article_black.svg";

const AdminNavbar = () => {
  return (
    <div className={styles.container}>
      <img src="/images/logo.png" alt="Jay Pet Store logo" />
      <div className={styles.navigationItems}>
        <NavLink exact activeClassName={styles.navlinkActive} to="/">
          <HomeBlack className={styles.navIcon} />
          View Site
        </NavLink>
        <NavLink exact activeClassName={styles.navlinkActive} to="/admin">
          <ShoppingCartBlack className={styles.navIcon} />
          Pets for sale
        </NavLink>
        <NavLink exact activeClassName={styles.navlinkActive} to="/admin/addPet"
       >
          <AddBlack className={styles.navIcon} />
          Add pet
        </NavLink>
        <NavLink exact activeClassName={styles.navlinkActive} to="/orders">
          <ArticleBlack className={styles.navIcon} />
          Purchase Orders
        </NavLink>
      </div>
      <hr />
    </div>
  );
};

export default AdminNavbar;
