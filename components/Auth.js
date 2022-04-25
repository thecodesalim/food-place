import { useState } from "react";
import Image from "next/image";
import Head from "next/dist/shared/lib/head";
import { supabase } from "../utils/supabaseClient";
import styles from "../styles/Auth.module.css";
import Input from "./Input";

export default function Auth() {
  const [type, setType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      alert("Logged In");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert("Signed Up successfully");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const controlType = () => {
    setType(!type);
  };

  return (
    <div>
      <Head>
        <title>Food Place</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {!type ? (
        <div className={styles.container}>
          <h1 className="text-lg font-semibold">Food Place</h1>
          <p className="pb-4 text-sm">
            a community of food explorers, sharing our food adventures and
            helping each other find the next food spot.
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="
               h-7 w-20 rounded-md bg-sky-500 text-gray-50 cursor-pointer mt-4 text-sm"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              disabled={loading}
            >
              <span>{loading ? "Loading" : "Connect"}</span>
            </button>
            <button
              className="text-sm ml-2"
              onClick={(e) => {
                e.preventDefault();
                controlType();
              }}
              disabled={loading}
            >
              <span>
                {type
                  ? "Already have an account"
                  : "Register for a free acount"}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className="text-lg font-semibold">Food Place</h1>
          <p className="pb-4 text-sm">
            a community of food explorers, sharing our food adventures and
            helping each other find the next food spot.
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="
              h-7 w-20 rounded-md bg-sky-500 text-gray-50 cursor-pointer mt-4 text-sm"
              onClick={(e) => {
                e.preventDefault();
                handleSignUp(email, password);
              }}
              disabled={loading}
            >
              <span>{loading ? "Loading" : "Connect"}</span>
            </button>
            <button
              className="text-sm ml-2"
              onClick={(e) => {
                e.preventDefault();
                controlType();
              }}
              disabled={loading}
            >
              <span>
                {type
                  ? "Already have an account"
                  : "Register for a free acount"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
