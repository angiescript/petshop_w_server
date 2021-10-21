import React from "react";
import styles from "./index.module.scss";
import { ReactComponent as SearchBlack } from "../../../assets/icons/search_black.svg";


const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={styles.searchBar}>
      <SearchBlack className={styles.searchIcon} />
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} placeholder={`Search`}/>
    </span>
  );
};

export default GlobalFilter;
