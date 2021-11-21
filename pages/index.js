import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Home from "../components/Home";

export default function Index() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {/* <Auth /> */}
      {!session ? (
        <Auth />
      ) : (
        // <Account key={session.user.id} session={session} />
        <Home key={session.user.id} session={session} />
      )}
    </div>
  );
}
