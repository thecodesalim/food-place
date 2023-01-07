"use client";

import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className=" h-screen w-screen flex flex-col p-5 text-[#959595]">
      <p className=" italic text-black">index</p>
      <div className=" w-auto h-px bg-grey"></div>
      <div className=" mt-4"></div>
      <h1 className=" text-4xl text-black">Eat & Share.</h1>
      <p className=" text-sm italic mt-2">
        An online community to share, discover and collect your favourite meals.
      </p>
      <div className=" text-sm">
        <div className=" mt-5 flex flex-row items-center space-x-4">
          <Button
            title="join"
            onClick={() => router.push("/signin")}
            hidden={false}
          />
        </div>
      </div>
    </div>
  );
}
