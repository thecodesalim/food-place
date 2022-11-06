export default function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      className="appearance-none outline-none h-8 w-60 text-sm border-b"
    />
  );
}
