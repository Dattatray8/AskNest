import { useState } from "react";

function AutoExpandTextarea({ placeholder, onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <textarea
      className="w-full p-2 resize-none focus:outline-none bg-transparent text-lg leading-relaxed"
      rows={1}
      placeholder={placeholder || "Write here..."}
      value={value}
      onChange={handleChange}
    />
  );
}

export default AutoExpandTextarea;
