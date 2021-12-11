import styles from "../styles/Button.module.css";
export default function Button(props) {
  return (
    <button
      className={styles.btn}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}
