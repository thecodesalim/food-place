import styles from "../styles/Button.module.css";
export default function Button(props) {
  return (
    <button
      className={props.main ? styles.btn : styles.btn_sec}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}
