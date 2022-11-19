export default function Input({ type, placeholder, onChange, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="appearance-none outline-none h-8 w-60 text-sm border-b border-grey font-light"
    />
  );
}
