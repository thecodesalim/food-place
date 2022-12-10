"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Entry from "../../../components/Entry";

export default function Page() {
  const { data: session } = useSession();
  const [input, setInput] = useState(false);
  //const [items, setItems] = useState([]);
  const [hidden, setHidden] = useState(false);

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/item")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  const add = async (item) => {
    setData([item, ...data]);
    const { name, meal } = item;
    const body = { name, meal, user: session.user };
    try {
      await fetch(`/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
            <Card key={index} name={i.restaurant} meal={i.meal} />
          ))}
        </div>
      </div>
    );
  }
}
