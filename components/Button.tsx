export default function Button({
  title,
  onClick,
}: {
  title: string;
  onClick: React.MouseEventHandler;
}) {
  return (
    <button
      className=" border rounded-md text-black text-sm p-2 px-4"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
