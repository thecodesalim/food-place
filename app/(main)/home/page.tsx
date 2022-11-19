"use client";

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
  const [input, setInput] = useState(false);
  return (
    <div>
      <p className=" italic">index</p>
      <div className=" w-auto h-px bg-grey"></div>
      <div className=" mt-4">
        <Button onClick={() => setInput(!input)} />
        <Entry isVisible={input} />
        {bootlegs.map((i, index) => (
          <Card key={index} name={i.name} meal={i.meal} />
        ))}
      </div>
    </div>
  );
}
