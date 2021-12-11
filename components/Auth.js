import { useState } from "react";
import Image from "next/image";
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
      {type ? (
        <div className={styles.container}>
          <h1>Food Place</h1>
          <p>Share your food exploration</p>
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
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              disabled={loading}
            >
              <span>{loading ? "Loading" : "Connect"}</span>
            </button>
            <button
              style={{ border: "none", marginLeft: "8px" }}
              onClick={(e) => {
                e.preventDefault();
                controlType();
              }}
              disabled={loading}
            >
              <span>
                {type
                  ? "Register for a free acount"
                  : "Already have an account"}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>Food Place</h1>
          <p>Share your food exploration!</p>
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
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                handleSignUp(email, password);
              }}
              disabled={loading}
            >
              <span>{loading ? "Loading" : "Connect"}</span>
            </button>
            <button
              style={{ border: "none", marginLeft: "8px" }}
              onClick={(e) => {
                e.preventDefault();
                controlType();
              }}
              disabled={loading}
            >
              <span>
                {type
                  ? "Register for a free acount"
                  : "Already have an account"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
