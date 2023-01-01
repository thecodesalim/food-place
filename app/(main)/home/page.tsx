"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/ItemCard";
import Entry from "../../../components/ItemEntry";

export default function Page() {
  const { data: session } = useSession();
  const [input, setInput] = useState(false);
  //const [items, setItems] = useState([]);
  const [hidden, setHidden] = useState(false);

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      fetch("/api/item", {
        //body: JSON.stringify({ user: session.user }),
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const add = async (item) => {
    setData([item, ...data]);
    const { name, meal } = item;
    try {
      await fetch(`/api/user`, {
        body: JSON.stringify({ name, meal, user: session.user }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggle = () => {
    setInput(!input);
    setHidden(!hidden);
  };
  if (isLoading) return <p>Loading...</p>;
  if (session) {
    return (
      <div>
        <p className=" italic">index</p>
        <div className=" w-auto h-px bg-grey"></div>
        <div className=" mt-4">
          <AnimatePresence>
            {!hidden && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button title="Place" onClick={toggle} hidden={hidden} />
              </motion.div>
            )}
          </AnimatePresence>
          <Entry isVisible={input} item={add} />
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
    );
  }
}
