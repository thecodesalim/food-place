import { useState } from "react";

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(text: string) {
    setValue(text);
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}
