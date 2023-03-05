import { useRouter } from "next/navigation";
import React from "react";

export default function ProfileCard({
  name,
  followingId,
  isFollowed,
  onClick,
}: {
  name: string;
  followingId: string;
  isFollowed: Boolean;
  onClick: React.MouseEventHandler;
}) {
  const router = useRouter();
  // const handleFollow = async (id: string) => {
  //   if (isFollowed.length > 0) {
  //     try {
  //       console.log("delete");
  //       await fetch(`/api/connect`, {
  //         body: JSON.stringify({ id }),
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     try {
  //       console.log("follow");
  //       await fetch(`/api/connect`, {
  //         body: JSON.stringify({ id }),
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  return (
    <div className=" flex flex-col mt-4">
      <div className=" font-medium">{name}</div>
      <ul className=" flex gap-2 text-grey mt-1 cursor-pointer">
        <li onClick={() => router.push(`/user/${followingId}`)}>restaurants</li>
        <li onClick={() => router.push(`/user/${followingId}/subscriptions`)}>
          following
        </li>
        <li className=" text-primary" onClick={onClick}>
          {isFollowed ? "unfollow" : "follow"}
        </li>
      </ul>
    </div>
  );
}
