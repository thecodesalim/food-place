export default function Button({ onClick }) {
  return (
    <button
      className=" border rounded-md text-black text-sm p-2 px-4"
      onClick={onClick}
    >
      Sign up
    </button>
  );
}
