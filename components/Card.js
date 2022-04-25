import react from "react";

export default function Card({ name, meal }) {
  const [drop, setDrop] = react.useState(false);

  const toggleDrop = () => {
    setDrop(!drop);
  };
  return (
    <div className="flex flex-col border-2 rounded-md border-sky-500 p-3 m-6">
      <div className="flex flex-row space-x-3">
        <p className="text-xs text-gray-400">abuja, nigeria</p>
        <p className="text-xs text-gray-400">december 11, 2021</p>
      </div>
      <div className="flex flex-row space-x-3 pt-2">
        <p className="font-medium">{name}</p>
        <p>{meal}</p>
      </div>
      <div className="flex flex-row space-x-3">
        <p className="text-sm text-gray-400">write note</p>
        <button className="text-sm text-gray-400" onClick={toggleDrop}>
          add to list
        </button>
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
