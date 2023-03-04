"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProfileCard from "../../../../../components/ProfileCard";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [hidden, setHidden] = useState(false);
  const [details, setDetails] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`/api/follows/${params.slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    } catch (error) {}
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`/api/user/${params.slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setDetails(data.users[0].name);
          setLoading(false);
        });
    } catch (error) {}
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (session) {
    return (
      <div>
        <p className=" italic">following</p>
        <div className=" w-auto h-px bg-grey"></div>
        <div className=" flex justify-around">
          <div>
            <ProfileCard
              name={details}
              followingId={params.slug}
              isFollowed={[]}
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
              {data.map((i) => (
                <div className=" flex flex-row gap-2" key={i.id}>
                  <p
                    className=" text-primary cursor-pointer"
                    onClick={() => router.push(`/user/${i.following.id}`)}
                  >
                    - {i.following.id}
                  </p>
                  <p>{i.following.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <ul className=" mt-4 text-primary">
              <li>Restaurants</li>
              <li>Tags</li>
              <li className=" text-black">Following</li>
              <li>Profile</li>
              <li>Log out</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
