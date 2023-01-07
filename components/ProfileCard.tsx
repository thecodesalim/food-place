import { useRouter } from "next/navigation";

export default function ProfileCard({
  name,
  followingId,
}: {
  name: string;
  followingId: string;
}) {
  const router = useRouter();
  const handleFollow = async (id: string) => {
    try {
      await fetch(`/api/connect`, {
        body: JSON.stringify({ id }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" flex flex-col mt-4">
      <div className=" font-medium">{name}</div>
      <ul className=" flex gap-2 text-grey mt-1 cursor-pointer">
        <li onClick={() => router.push(`/user/${followingId}`)}>restaurants</li>
        <li onClick={() => router.push(`/user/${followingId}/subscriptions`)}>
          following
        </li>
        <li className=" text-primary" onClick={() => handleFollow(followingId)}>
          follow
        </li>
      </ul>
    </div>
  );
}
