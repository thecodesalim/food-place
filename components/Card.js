import styles from "../styles/Card.module.css";
export default function Card({ name, meal }) {
  return (
    <div className={styles.card}>
      <div className={styles.food}>
        <p className={styles.restaurant}>{name}</p>
        <p>{meal}</p>
      </div>
      <div className={styles.food_details}>
        <p className={styles.location}>Abuja, Nigeria</p>
        <p className={styles.date}>December 11, 2021</p>
      </div>
    </div>
  );
}
