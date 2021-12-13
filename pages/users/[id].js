import Card from "../../components/Card";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import styles from "../../styles/User.module.css";

import { getItem } from "../../utils/supabaseClient";

export default function User({ item }) {
  console.log(item);

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <Header />
        <Nav />
      </div>
      {item.map((i) => (
        <Card
          key={i.restaurant_name}
          name={i.restaurant_name}
          meal={i.favourite_meal}
        />
      ))}
    </main>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const item = await getItem(id);
  //const bookJson = JSON.stringify(book);

  return {
    props: {
      item,
    },
  };
}
