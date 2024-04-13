import styles from "./GradientBalls.module.css";

function GradientBalls() {
  return (
    <div className={styles.load}>
    <div className={styles.a2d}>
        <div className={styles.ball} style={{"--i": 0}}></div>
        <div className={styles.ball} style={{"--i": 1}}></div>
    </div>
</div>
  );
}

export default GradientBalls;

// Was imported from https://codepen.io/thebabydino/pen/LYbaGdr
// Originally hosted on https://freefrontend.com/css-loaders/