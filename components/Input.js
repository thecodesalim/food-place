export default function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      style={{
        border: "none",
        width: "350px",
        height: "30px",
        borderRadius: "4px",
        borderWidth: "1px",
        borderColor: "#ddd",
        borderStyle: "solid",
        marginBottom: "8px",
      }}
    />
  );
}
