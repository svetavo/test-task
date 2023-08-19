import { useState } from "react";
import selectStyles from "./Select.module.css";

export const Select = ({ title, list, placeholder }) => {
  const [active, setActive] = useState();

  return (
    <div className={selectStyles.item}>
      <h3 className={selectStyles.title}>{title}</h3>
      <div className={selectStyles.input_container}>
        <select className={selectStyles.input} placeholder={placeholder}>
          <option>{placeholder}</option>
          {list.map((element) => (
            <option>{element}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
