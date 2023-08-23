import inputStyles from "./Input.module.css";
import currencyIcon from "../../../images/currency.svg";
import infoIcon from "../../../images/info.svg";
import warningWhite from "../../../images/warning_white.svg";
import warningIcom from "../../../images/warning.svg";
import { useState } from "react";
import Slider from "../../Slider/Slider";

export const Input = ({
  id,
  loan,
  title,
  value,
  onChange,
  currency,
  defaultValue,
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
  setDownpayError,
  setDurationError,
  setIsErrorActive,
  price,
  duration,
  downPayment,
  setMonthlypaymentError,
  durationCalculation,
}) => {
  const [hintActive, setHintActive] = useState(false);

  const validateNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onChangeDownPayment = (value) => {
    if (Number(value) < (price * 25) / 100) {
      setDownpayError(true);
      setIsErrorActive(true);
    } else if (Number(value) > price) {
      setIsErrorActive(true);
      setDownpayError(true);
    } else {
      setDownpayError(false);
      setIsErrorActive(false);
    }
    setDownPayment(Number(value));
  };

  const onChangeDuration = (value) => {
    if (Number(value) > 30) {
      setDurationError(true);
      setIsErrorActive(true);
    } else if (Number(value) < 4) {
      setDurationError(true);
      setIsErrorActive(true);
    } else {
      setDurationError(false);
      setIsErrorActive(false);
    }
    setDuration(value);
  };

  const onChangeMonthlyPayment = (value) => {
    if (Number(value) < Math.round((price - downPayment) / (duration * 12))) {
      setMonthlypaymentError(true);
      setIsErrorActive(true);
    } else {
      setMonthlypaymentError(false);
      setIsErrorActive(false);
    }
    setMonthlyPayment(Number(value));
    setDuration(Number((loan / Number(value) / 12).toFixed(0)));
    console.log(duration);
  };

  // формат числа
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
        {id === "downpayment" ? (
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
            <p className={inputStyles.hint_text}>
              Основная квартира: у заемщика нет квартиры, ставка финансирования
              максимум до 75%
            </p>
            <p className={inputStyles.hint_text}>
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
          type="number"
          min={0}
          max={max}
          onChange={onChange}
          value={value}
          onKeyPress={(e) => validateNumbers(e)}
          maxLength={8}
        ></input>
        {currency ? (
          <img
            className={inputStyles.input_img}
            src={currencyIcon}
            alt="шекель"
          ></img>
        ) : null}
      </div>

      {id === "downpayment" ? (
        <Slider
          min={min}
          max={max}
          step={1}
          value={Number(value)}
          defaultValue={500000}
          onChange={(value) => onChangeDownPayment(Number(value))}
        />
      ) : null}

      {id === "duration" ? (
        <div>
          <Slider
            min={4}
            max={30}
            step={1}
            defaultValue={30}
            value={Number(value)}
            onChange={(value) => onChangeDuration(Number(value))}
          />
          <div className={inputStyles.slider_text_container}>
            <p className={inputStyles.slider_text}>4 года</p>
            <p className={inputStyles.slider_text}>30 лет</p>
          </div>
        </div>
      ) : null}

      {id === "payment" ? (
        <div>
          <Slider
            min={min}
            max={max}
            step={1}
            value={monthlyPayment}
            defaultValue={defaultValue}
            onChange={(value) => onChangeMonthlyPayment(Number(value))}
          />
          <div className={inputStyles.slider_text_container}>
            <p className={inputStyles.slider_text}>{min} ₪</p>
            <p className={inputStyles.slider_text}>{max} ₪</p>
          </div>
        </div>
      ) : null}

      {id === "downpayment" ? (
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

      {id === "payment" ? (
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
