import styles from "./ButtonComp.module.css";

function ButtonComp({ otherProps, className, children }) {
  return (
    <button {...otherProps} className={`${styles.custBtn} ${className}`}>
      {children}
    </button>
  );
}

export default ButtonComp;
