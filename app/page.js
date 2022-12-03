"use client";

import Button from "../components/Button";
import Input from "../components/Input";
export default function Page() {
  return (
    <div className=" h-screen w-screen flex flex-col p-5 text-[#959595]">
      <h1 className=" text-lg font-semibold text-gray-800">Eat & Share.</h1>
      <p className=" text-sm italic">
        An online community to share, discover and collect your favourite meals.
      </p>
      <div className=" text-sm">
        <ul className=" ">
          <li className=" flex flex-col">
            <Input placeholder="Email" />
          </li>
          <li className=" flex flex-col">
            <Input placeholder="Name" />
          </li>
          <li className=" flex flex-col">
            <Input placeholder="Username" />
          </li>
          <li className=" flex flex-col">
            <Input placeholder="Password" />
          </li>
          <li className=" flex flex-col">
            <Input placeholder="Password" />
          </li>
        </ul>
        <div className=" mt-5 flex flex-row items-center space-x-4">
          <Button title="sign up" />
          <p>already have an account?</p>
        </div>
      </div>
    </div>
  );
}
