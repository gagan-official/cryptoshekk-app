// import { useEffect, useState } from "react";
import styles from "./GradientBorder.module.css";

function GradientBorder({ loading }) {

  return (
    <div className={`${styles.loaderAbsoluteCont} ${loading==="true"? styles.fadeInClass : loading==="animate" ? styles.fadeOutClass : ""}`}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
}

export default GradientBorder;

// Was imported from https://codepen.io/jh3y/pen/jOVNOeg
// Originally hosted on https://freefrontend.com/css-loaders/