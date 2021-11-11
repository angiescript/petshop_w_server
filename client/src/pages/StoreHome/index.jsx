import React from "react";
import StoreNavbar from "../../components/Navbars/StoreNavbar";
import styles from "./index.module.scss";
import dogGif from "../../assets/jayway-pet-store-splash-video-02.mp4";

const StoreHome = () => {
  return (
    <div className={styles.storeHome}>
      <StoreNavbar />
      <div className={styles.storeHomeMain}>
        <div className={styles.greetingVideo}>
          <video src={dogGif} type="video/mp4" className={styles.dogVideo} autoPlay loop muted />
        </div>
        <div className={styles.storeContent}>
            <p>NEW STORE INCOMING - STAY TUNED</p>
          <h2>Coming soon...</h2>
        </div>
      </div>
    </div>
  );
};

export default StoreHome;
