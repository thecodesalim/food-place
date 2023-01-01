"use client";
import { useEffect, useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [providers, setProviders] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("home");
  }
  useEffect(() => {
    const fetchData = async () => {
      const p = await getProviders();
      setProviders(p);
    };
    fetchData().catch(console.error);
  }, []);
  if (providers) {
    return (
      <div>
        <p className=" italic">sign in</p>
        <div className=" w-auto h-px bg-grey">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
