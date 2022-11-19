"use client";
import React, { useState } from "react";

type Entry = {
  name: string;
  meal: string;
};

export default function Card({ name, meal }: Entry) {
  const [drop, setDrop] = useState(false);

  const toggleDrop = () => {
    setDrop(!drop);
  };
  return (
    <div className=" flex flex-col mt-5 space-y-1 ">
      <div className=" flex flex-row space-x-3">
        <p className=" font-medium">{name}</p>
        <p>{meal}</p>
      </div>
      <div className=" flex flex-row space-x-3 text-grey text font-light">
        <p>abuja, nigeria</p>
        <p>november 2022</p>
        <p>write note</p>
        <p onClick={toggleDrop}>add to list</p>
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
    </div>
  );
}
