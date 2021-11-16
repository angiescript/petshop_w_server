import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import { ReactComponent as XBlack } from "../../assets/icons/x_black.svg"; 

const BackButton = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.push(`/admin/`);
  };

  return (
    <div className={styles.backButtonWrapper}>
      <button className={styles.backButton} onClick={handleBackClick}>
        <XBlack />
      </button>
    </div>
  );
};

export default BackButton;
