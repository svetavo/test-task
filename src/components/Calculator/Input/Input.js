import inputStyles from "./Input.module.css";
import currencyIcon from "../../../images/currency.svg";
import infoIcon from "../../../images/info.svg";
import warningIcom from "../../../images/warning.svg";
import { useState } from "react";

export const Input = ({ title, numbers, scale, info, onChange, currency, percent }) => {
  //   const [defInput, setDefInput] = useState(numbers);
  return (
    <div className={inputStyles.item}>
      <h3 className={inputStyles.title}>
        {title}
        {info ? (
          <img
            src={infoIcon}
            className={inputStyles.title_img}
            alt="Информация"
          />
        ) : null}
      </h3>
      <div className={inputStyles.input_container}>
        <input
          className={inputStyles.input}
          type="text"
          name="price"
          onChange={onChange}
          defaultValue={numbers}
        ></input>
        {currency ? (
          <img
            className={inputStyles.input_img}
            src={currencyIcon}
            alt="шекель"
          ></img>
        ) : null}
      </div>
      {/* {scale ? (
        <RangeSlider min={0} max={Number(price)} />
      ) : // <input type="range" onChange={(e) => handleChangeRange(e)}></input>
      null} */}
      {info ? (
        <div className={inputStyles.hint_container}>
          <img
            className={inputStyles.hint_img}
            src={warningIcom}
            alt="Внимание"
          />
          <div className={inputStyles.hint_text}>
            <p>Сумма финансирования: {percent} %</p>
            <p>Процент финансирования: </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
