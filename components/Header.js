import styles from "../styles/Header.module.css";
export default function Header({ name }) {
  return (
    <div className={styles.main}>
      <div className={styles.name}>full name here</div>
      <div className={styles.links}>
        <a href="">restaurants</a>
        <a href="">list</a>
        <a href="">following</a>
        <button className={styles.btn}>follow</button>
      </div>
    </div>
  );
}
