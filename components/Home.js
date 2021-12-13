import Head from "next/head";
import Image from "next/image";
import react from "react";
import { supabase } from "../utils/supabaseClient";
import styles from "../styles/Home.module.css";
import Input from "../components/Input";
import Nav from "../components/Nav";
import Card from "./Card";

export default function Home() {
  return <Profile />;
}

function Profile({ session }) {
  const [loading, setLoading] = react.useState(false);
  const [modal, setModal] = react.useState(false);
  const [name, setName] = react.useState("");
  const [meal, setMeal] = react.useState("");
  const [fetchRest, setFetchRest] = react.useState([]);

  react.useEffect(() => {
    getProfile();
    getItems();
  }, [session, name]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select("username, website, avatar_url")
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        console.log(data, user.id);
        setName(data.username);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getItems = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("item")
        .select("*")
        .eq("user_id", user.id);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setFetchRest([...data].reverse());
        console.log(fetchRest);
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function saveInfo() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const info = {
        user_id: user.id,
        restaurant_name: name,
        favourite_meal: meal,
      };

      let { error } = await supabase.from("item").insert(info, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddRestaurant = () => {
    saveInfo();
    setName("");
    setMeal("");
  };
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <button className={styles.btn} onClick={toggleModal}>
          Add
        </button>
        <div
          className={styles.modal}
          style={
            modal
              ? { display: "flex", flexDirection: "column" }
              : { display: "none" }
          }
        >
          <p>New Restaurant</p>
          <Input
            placeholder="Restaurant"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Favourite meal"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          />
          <div>
            <button className={styles.btn} onClick={handleAddRestaurant}>
              Save
            </button>
            <button className={styles.btn} onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
        <p>Recents:</p>
        {fetchRest.map((i) => (
          <Card key={i.id} name={i.restaurant_name} meal={i.favourite_meal} />
        ))}
      </div>
      <div className={styles.info}>
        <Nav username={name} />
      </div>
    </main>
  );
}

function Header() {}
