export default function Button({
  title,
  onClick,
  hidden,
}: {
  title: string;
  onClick: React.MouseEventHandler;
  hidden: boolean;
}) {
  return (
    <button
      className={
        hidden ? " hidden" : "border rounded-md text-black text-sm p-1 px-4"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
}
