import { useEffect } from "react";
import { useState } from "react";
import calculatorStyles from "./Calculator.module.css";
import { Input } from "./Input/Input";
import { Select } from "./Select/Select";
import { cities, periods, estateTypes, ownership } from "../../data/data";

export const Calculator = () => {
  const [price, setPrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState();
  const [percent, setPercent] = useState();
  const [duration, setDuration] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState();
  const [ownershipType, setOwnershipType] = useState("");
  const [maxFinance, setMaxFinance] = useState(price);
  const [city, setCity] = useState("");
  const [estateType, setEstateType] = useState("");
  const [period, setPeriod] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [downpayError, setDownpayError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [monthlypaymentError, setMonthlypaymentError] = useState(false);
  const [isErrorActive, setIsErrorActive] = useState(false);

  const onChangePrice = (e) => {
    setPrice(Number(e.target.value));
    if (Number(e.target.value) > 10000000) {
      setPriceError(true);
      setIsErrorActive(true);
    } else {
      setPriceError(false);
      setIsErrorActive(false);
    }
  };

  const onChangeDownPayment = (e) => {
    setDownPayment(Number(e.target.value));
    if (Number(e.target.value) < (price * 25) / 100) {
      setDownpayError(true);
      setIsErrorActive(true);
    } else if (Number(e.target.value) > price) {
      setIsErrorActive(true);
      setDownpayError(true);
    } else {
      setDownpayError(false);
      setIsErrorActive(false);
    }
  };

  const onChangeDuration = (e) => {
    setDuration(Number(e.target.value));
    if (Number(e.target.value) > 30) {
      setDurationError(true);
      setIsErrorActive(true);
    } else {
      setDurationError(false);
      setIsErrorActive(false);
    }
  };

  const onChangeMonthlyPayment = (e) => {
    console.log("hi,", e.target.value);
    setMonthlyPayment(Number(e.target.value));
    if (
      Number(e.target.value) <
      Math.round((price - downPayment) / (duration * 12))
    ) {
      setMonthlypaymentError(true);
      setIsErrorActive(true);
    } else {
      setMonthlypaymentError(false);
      setIsErrorActive(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      price: price,
      downPayment: downPayment,
      city: city,
      estateType: estateType,
      period: period,
      ownershipType: ownershipType,
      duration: duration,
      monthlyPayment: monthlyPayment,
    };
    localStorage.setItem("data", JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem("data")));
    alert("Форма сохранена");
  };

  useEffect(() => {
    setDownPayment(Math.round(price / 2));
  }, [price]);

  useEffect(() => {
    setPercent(Math.floor((downPayment * 100) / price));
  }, [downPayment]);

  const ownershipHandler = () => {
    if (ownershipType === "Нет, я пока не владею недвижимостью") {
      setMaxFinance((price * 75) / 100);
    } else if (
      ownershipType === "Да, у меня уже есть недвижимость в собственности"
    ) {
      setMaxFinance((price * 50) / 100);
    } else if (
      ownershipType ===
      "Я собираюсь продать единственную недвижимость в ближайшие два года, чтобы использовать полученный капитал для приобритения новой"
    ) {
      setMaxFinance((price * 70) / 100);
    }
  };

  const paymentCalculation = () => {
    const payment = Math.round((price - downPayment) / (duration * 12));
    setMonthlyPayment(Number(payment));
  };

  const minPayment = Math.round((price - downPayment) / 360);
  const maxPayment = Math.round((price - downPayment) / 48);

  useEffect(() => {
    ownershipHandler();
  }, [ownershipType]);

  useEffect(() => {
    paymentCalculation();
  }, [price, downPayment, duration]);

  return (
    <div className={calculatorStyles.container}>
      <h1 className={calculatorStyles.header}>
        Рассчитайте ипотеку быстро и просто
      </h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={calculatorStyles.section}>
          <div className={calculatorStyles.column}>
            <Input
              title="Стоимость недвижимости"
              value={price}
              onChange={onChangePrice}
              max={10000000}
              errorText="Стоимость недвижимости не может превышать 10,000,000"
              isErrorActive={isErrorActive}
              error={priceError}
              currency
            />
            <Input
              title="Первоначальный взнос"
              value={downPayment}
              onChange={onChangeDownPayment}
              setDownPayment={setDownPayment}
              percent={percent}
              max={maxFinance}
              error={downpayError}
              isErrorActive={isErrorActive}
              errorText="Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости"
              slider
              currency
              info
            />
          </div>
          <div className={calculatorStyles.column}>
            <Select
              title="Город покупки недвижимости"
              list={cities}
              placeholder="Выберите город"
              onClickItem={setCity}
              value={city}
            />
            <Select
              title="Тип недвижимости"
              list={estateTypes}
              placeholder="Выберите тип недвижимости"
              onClickItem={setEstateType}
              value={estateType}
            />
          </div>
          <div className={calculatorStyles.column}>
            <Select
              title="Когда вы планируете оформть ипотеку?"
              list={periods}
              placeholder="Выберите период"
              onClickItem={setPeriod}
              value={period}
            />
            <Select
              title="Вы уже владеете недвижимостью?"
              list={ownership}
              placeholder="Выберите ответ"
              onClickItem={setOwnershipType}
              value={ownershipType}
            />
          </div>
        </div>
        <div className={calculatorStyles.line}></div>
        <div className={calculatorStyles.section}>
          <div className={calculatorStyles.column}>
            <Input
              title="Срок"
              value={Number(duration)}
              min={4}
              max={30}
              onChange={onChangeDuration}
              error={durationError}
              isErrorActive={isErrorActive}
              errorText="Cрок ипотеки не может превышать 30 лет"
              slider
              setDuration={setDuration}
            />
          </div>
          <div className={calculatorStyles.column}>
            <Input
              title="Ежемесячный платеж"
              value={Number(monthlyPayment)}
              onChange={onChangeMonthlyPayment}
              errorText={`Размер ежемесячного платежа не может быть меньше ${minPayment} иначе срок будет больше 30 лет`}
              min={minPayment}
              max={maxPayment}
              error={monthlypaymentError}
              isErrorActive={isErrorActive}
              setMonthlyPayment={setMonthlyPayment}
              slider
              monthlyPayment
              currency
              info
            />
          </div>
        </div>
        <div className={calculatorStyles.line}></div>
        <div className={calculatorStyles.section}>
          <button
            className={calculatorStyles.button}
            type="submit"
            disabled={
              !price ||
              !downPayment ||
              !city ||
              !estateType ||
              !duration ||
              !ownershipType ||
              !period ||
              !monthlyPayment ||
              isErrorActive
            }
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
  );
};
