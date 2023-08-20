import inputStyles from "./Input.module.css";
import currencyIcon from "../../../images/currency.svg";
import infoIcon from "../../../images/info.svg";
import warningWhite from "../../../images/warning_white.svg";
import warningIcom from "../../../images/warning.svg";
import { useState } from "react";

export const Input = ({
  title,
  value,
  slider,
  info,
  onChange,
  currency,
  percent,
  max,
  min,
  setDownPayment,
  setDuration,
  monthlyPayment,
  setMonthlyPayment,
  errorText,
  error,
  isErrorActive,
}) => {
  const [hintActive, setHintActive] = useState(false);

  const validateNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const dragHandlerDownPayment = (e) => {
    onChange(e);
    setDownPayment(Number(e.target.value));
  };

  const dragHandlerDuration = (e) => {
    onChange(e);
    setDuration(Number(e.target.value));
  };

  const dragHandlerMonthlyPayment = (e) => {
    setMonthlyPayment(e.target.value);
  };

  const getFormatValue = (value) => {
    console.log(value);
    return new Intl.NumberFormat("en-GB", {
      maximumSignificantDigits: 3,
    }).format(value);
  };

  return (
    <div className={inputStyles.item}>
      <h3 className={inputStyles.title}>
        {title}
        {info && setDownPayment ? (
          <img
            src={infoIcon}
            className={inputStyles.title_img}
            alt="Информация"
            onMouseEnter={() => setHintActive(true)}
            onMouseLeave={() => setHintActive(false)}
          />
        ) : null}
        {hintActive ? (
          <div className={inputStyles.hint_container}>
            <p>
              Основная квартира: у заемщика нет квартиры, ставка финансирования
              максимум до 75%
            </p>
            <p>
              Альтернативная квартира: Для заемщика квартира, которую он
              обязуется продать в течение двух лет, ставка финансирования
              максимум до 70%
            </p>
            <p>
              Вторая квартира или выше: у заемщика уже есть, ставка
              финансирования квартиры максимум до 50%
            </p>
          </div>
        ) : null}
      </h3>
      <div className={inputStyles.input_container}>
        <input
          className={
            error
              ? `${inputStyles.input} ${inputStyles.input_error}`
              : `${inputStyles.input}`
          }
          type="text"
          max={max}
          onChange={onChange}
          value={value}
          onKeyPress={(e) => validateNumbers(e)}
        ></input>
        {currency ? (
          <img
            className={inputStyles.input_img}
            src={currencyIcon}
            alt="шекель"
          ></img>
        ) : null}
      </div>

      {slider && setDownPayment ? (
        <input
          className={inputStyles.slider}
          type="range"
          onChange={dragHandlerDownPayment}
          min={0}
          defaultValue={Number(value)}
          max={max}
          step={1}
        ></input>
      ) : null}

      {slider && setDuration ? (
        <input
          className={inputStyles.slider}
          type="range"
          onChange={dragHandlerDuration}
          min={4}
          max={30}
          step={1}
        ></input>
      ) : null}

      {slider && monthlyPayment ? (
        <div>
          <input
            className={inputStyles.slider}
            type="range"
            onChange={dragHandlerMonthlyPayment}
            min={min}
            max={max}
            step={1}
          ></input>
          <div className={inputStyles.slider_text_container}>
            <p className={inputStyles.slider_text}>{getFormatValue(min)} ₪</p>
            <p className={inputStyles.slider_text}>{getFormatValue(max)} ₪</p>
          </div>
        </div>
      ) : null}

      {info && setDownPayment ? (
        <div className={inputStyles.info_container}>
          <img
            className={inputStyles.info_img}
            src={warningIcom}
            alt="Внимание"
          />
          <div className={inputStyles.info_text}>
            <p className={inputStyles.info_text}>
              Сумма финансирования:{" "}
              <span className={inputStyles.info_text_bold}>{value} ₪</span>
            </p>
            <p className={inputStyles.info_text}>
              Процент финансирования:{" "}
              <span className={inputStyles.info_text_bold}>{percent} %</span>
            </p>
          </div>
        </div>
      ) : null}

      {info && monthlyPayment ? (
        <div className={inputStyles.info_container}>
          <img
            className={inputStyles.info_img}
            src={warningIcom}
            alt="Внимание"
          />
          <div className={inputStyles.info_text}>
            <p>Увеличте ежемесячный платеж и переплачивайте меньше </p>
          </div>
        </div>
      ) : null}

      {isErrorActive && error ? (
        <div
          className={`${inputStyles.info_container} ${inputStyles.error_container}`}
        >
          <img
            className={inputStyles.info_img}
            src={warningWhite}
            alt="Внимание"
          />
          <div className={`${inputStyles.info_text} ${inputStyles.error_text}`}>
            <p>{errorText}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
