"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Entry from "../../../components/Entry";

const bootlegs = [
  { name: "SFC", meal: "Burger" },
  { name: "KFC", meal: "Chicken" },
  { name: "November Cubes", meal: "Spicy Noodles" },
];
export default function Page() {
  const { data: session } = useSession();
  const [input, setInput] = useState(false);
  const [items, setItems] = useState(bootlegs);
  const [hidden, setHidden] = useState(false);

  const add = async (item) => {
    setItems([item, ...items]);
    const { name, meal } = item;
    const body = { name, meal, id: session.user.id };
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
          {items.map((i, index) => (
            <Card key={index} name={i.name} meal={i.meal} />
          ))}
        </div>
      </div>
    );
  }
}
