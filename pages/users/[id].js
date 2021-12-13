import { useRouter } from "next/router";
import useSwr from "swr";
import Card from "../../components/Card";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import styles from "../../styles/User.module.css";

import { getItem } from "../../utils/supabaseClient";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function User({ item }) {
  const router = useRouter();
  console.log(item);
  const { data, error } = useSwr(
    router.query.id ? `/api/user/${router.query.id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load user</div>;
  if (!data) return <div>Loading...</div>;

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
