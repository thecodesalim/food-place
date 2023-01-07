import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { logOut } from "../utils/supabaseClient";
import Button from "./Button";
export default function Nav(props) {
  return (
    <nav>
      <h1 className="text-sm">{props.username}</h1>
      <div className="flex flex-col text-sm m-2 text-blue-500">
        <a>restaurants</a>
        <a>list</a>
        <a>profile</a>
        <Link href="/settings">settings</Link>
        {/* <Button title="log out" onClick={() => logOut()} /> */}
        <Link href="/">log out</Link>
      </div>
    </nav>
  );
}
