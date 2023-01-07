//"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Entry = {
  name: string;
  meal: string;
  date: string;
};

export default function Card({ name, meal, date }: Entry) {
  const [drop, setDrop] = useState(false);

  const toggleDrop = () => {
    setDrop(!drop);
  };
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      className=" flex flex-col mt-5 space-y-1 "
    >
      <div className=" flex flex-row space-x-3">
        <p className=" font-medium">{name}</p>
        <p>{meal}</p>
      </div>
      <div className=" flex flex-row space-x-3 text-grey text font-light">
        <p>abuja, nigeria</p>
        <p>{date}</p>
        <p>private reply</p>
      </div>
    </motion.div>
  );
}
