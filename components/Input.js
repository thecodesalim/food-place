export default function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      className="h-8 w-60 text-sm rounded-md border border-gray-400 border-solid mb-4 ml-4 pl-2"
    />
  );
}
