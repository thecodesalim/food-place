import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { logOut } from "../utils/supabaseClient";
import Button from "./Button";
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
        {/* <Button title="log out" onClick={() => logOut()} /> */}
        <Link href="/">
          <a onClick={() => logOut()}>log out</a>
        </Link>
      </div>
    </nav>
  );
}
