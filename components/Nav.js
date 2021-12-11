import Link from "next/link";
import styles from "../styles/Nav.module.css";
export default function Nav(props) {
  return (
    <nav>
      <h1 className={styles.heading}>{props.username}</h1>
      <div className={styles.list}>
        <a>restaurants</a>
        <a>list</a>
        <a>profile</a>
        <Link href="/settings">
          <a>settings</a>
        </Link>
        <a>log out</a>
      </div>
    </nav>
  );
}
