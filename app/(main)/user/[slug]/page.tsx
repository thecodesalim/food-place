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
  const [isFollowed, setIsFollowed] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`/api/follows/${params.slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setIsFollowed(true);
            setLoading(false);
          }
        });
    } catch (error) {}
  }, [params.slug]);

  const handleFollow = async (id: string) => {
    if (isFollowed) {
      try {
        console.log("delete");
        await fetch(`/api/connect`, {
          body: JSON.stringify({ id }),
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        setIsFollowed(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        console.log("follow");
        await fetch(`/api/connect`, {
          body: JSON.stringify({ id }),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        setIsFollowed(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (session) {
    return (
      <div>
        <p className=" italic">profile</p>
        <div className=" w-auto h-px bg-grey"></div>
        <div className=" flex justify-around">
          <div>
            <ProfileCard
              name={details}
              followingId={params.slug}
              isFollowed={isFollowed}
              onClick={() => handleFollow(params.slug)}
            />
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
              <li>Profile</li>
              <li>Log out</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
