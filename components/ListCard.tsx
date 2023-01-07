//"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Entry = {
  title: string;
  desc: string;
};

export default function ListCard({ title, desc }: Entry) {
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
      <div className=" flex flex-col ">
        <p className=" font-medium">{title}</p>
        <p>{desc}</p>
      </div>
      <div className=" flex flex-row space-x-3 text-grey text font-light">
        <p>november 2022</p>
        <p>edit</p>
        <p onClick={toggleDrop}>add book</p>
      </div>
      <div className={drop ? "flex space-x-3" : "hidden"}>
        <select className="text-sm">
          <option>choose list</option>
        </select>
        <button className="text-sm text-blue-500">add to list</button>
        <button className="text-sm" onClick={toggleDrop}>
          cancel
        </button>
      </div>
    </motion.div>
  );
}
