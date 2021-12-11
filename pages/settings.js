import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import styles from "../styles/Settings.module.css";
import Input from "../components/Input";
import Nav from "../components/Nav";
import Button from "../components/Button";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    console.log("change");
    setUsername(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  async function updateProfile({ username, website, avatar_url }) {
    console.log(username, "username");
    console.log("ran");
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates, {
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
  return (
    <main className={styles.main}>
      <div className={styles.name}>
        <p className={styles.header}>Change Name</p>
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button
          title="Change"
          onClick={() => updateProfile({ username, website, avatar_url })}
        />
      </div>
      <Nav />
    </main>
  );
}
