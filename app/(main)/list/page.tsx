"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import List from "../../../components/List";

const bootlegs = [{ title: "SFC", description: "Burger" }];
export default function Page() {
  const [input, setInput] = useState(false);
  const [items, setItems] = useState(bootlegs);
  const [hidden, setHidden] = useState(false);

  const add = (item) => {
    setItems([item, ...items]);
  };

  const toggle = () => {
    setInput(!input);
    setHidden(!hidden);
  };
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
        {items.map((i, index) => (
          <Card key={index} name={i.title} meal={i.description} />
        ))}
      </div>
    </div>
  );
}
