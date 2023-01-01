"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import ListCard from "../../../components/ListCard";
import List from "../../../components/ListEntry";

export default function Page() {
  const { data: session } = useSession();
  const [input, setInput] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const add = async (item) => {
    setData([item, ...data]);
    const { title, description } = item;
    try {
      await fetch(`/api/list`, {
        body: JSON.stringify({ title, description, user: session.user }),
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

  useEffect(() => {
    setLoading(true);
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <p className=" italic">index</p>
      <div className=" w-auto h-px bg-grey"></div>
      <div className=" mt-4">
        <AnimatePresence>
          {!hidden && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button title="List" onClick={toggle} hidden={hidden} />
            </motion.div>
          )}
        </AnimatePresence>
        <List isVisible={input} item={add} />
        {data.map((i, index) => (
          <ListCard key={index} title={i.title} desc={i.description} />
        ))}
      </div>
    </div>
  );
}
