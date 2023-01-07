"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Card from "../../../../components/PublicCard";
import ProfileCard from "../../../../components/ProfileCard";

export default function Page({ params }) {
  const { data: session } = useSession();
  const [hidden, setHidden] = useState(false);
  const [details, setDetails] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`/api/user/${params.slug}`, {
        //body: JSON.stringify({ user: session.user }),
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.items);
          setDetails(data.users[0].name);
          setLoading(false);
        });
    } catch (error) {}
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (session) {
    return (
      <div>
        <p className=" italic">profile</p>
        <div className=" w-auto h-px bg-grey"></div>
        <div className=" flex justify-around">
          <div>
            <ProfileCard name={details} followingId={params.slug} />
            <div className=" mt-4">
              <AnimatePresence>
                {!hidden && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                )}
              </AnimatePresence>

              {data.map((i, index) => (
                <Card
                  key={index}
                  name={i.restaurant}
                  meal={i.meal}
                  date={new Date(i.date).toLocaleDateString()}
                />
              ))}
            </div>
          </div>
          <div>
            <ul className=" mt-4 text-primary">
              <li>Restaurants</li>
              <li>Tags</li>
              <li>Following</li>
              <li className=" text-black">Profile</li>
              <li>Log out</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
