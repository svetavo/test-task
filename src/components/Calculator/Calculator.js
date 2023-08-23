import { useEffect } from "react";
import { useState } from "react";
import calculatorStyles from "./Calculator.module.css";
import { Input } from "./Input/Input";
import { Select } from "./Select/Select";
import { cities, periods, estateTypes, ownership } from "../../data/data";
import { calc } from "../../utils/calc";

export const Calculator = () => {
  const [price, setPrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState();
  const [loan, setLoan] = useState();
  const [percent, setPercent] = useState();
  const [duration, setDuration] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
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
  const [rate, setRate] = useState(0.05);
  const [minPayment, setMinPayment] = useState();
  const [maxPayment, setMaxPayment] = useState();

  const onChangePrice = (e) => {
    if (Number(e.target.value) > 10000000) {
      setPriceError(true);
      setIsErrorActive(true);
    } else {
      setPriceError(false);
      setIsErrorActive(false);
    }
    setPrice(Number(e.target.value));
    setDownPayment(e.target.value * percent);
    paymentCalculation();
    setMaxPayment(calc(loan, 4 * 12, rate));
    setMinPayment(calc(loan, 30 * 12, rate));
  };

  const onChangeDownPayment = (e) => {
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
    setDownPayment(Number(e.target.value));
  };

  const onChangeDuration = (e) => {
    if (Number(e.target.value) > 30) {
      setDurationError(true);
      setIsErrorActive(true);
    } else if (Number(e.target.value) < 4) {
      setDurationError(true);
      setIsErrorActive(true);
    } else {
      setDurationError(false);
      setIsErrorActive(false);
    }
    setDuration(Number(e.target.value));
    paymentCalculation();
    console.log(monthlyPayment);
  };

  const onChangeMonthlyPayment = (e) => {
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
    setMonthlyPayment(Number(e.target.value));
    const durationcount = loan / monthlyPayment / 12;
    setDuration(durationcount.toFixed(0));
    console.log(durationcount);
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
    paymentCalculation();
  }, [price]);

  useEffect(() => {
    setLoan(Math.round(price - downPayment));
    setPercent(Math.floor((downPayment * 100) / price));
    setMaxPayment(calc(loan, 4 * 12, rate));
    setMinPayment(calc(loan, 30 * 12, rate));
    ownershipHandler();
  }, [price, downPayment, duration, monthlyPayment]);

  useEffect(() => {
    paymentCalculation();
  });

  const ownershipHandler = () => {
    if (ownershipType === "Нет, я пока не владею недвижимостью") {
      setMaxFinance(price * 0.75);
    } else if (
      ownershipType === "Да, у меня уже есть недвижимость в собственности"
    ) {
      setMaxFinance(price * 0.5);
    } else if (
      ownershipType ===
      "Я собираюсь продать единственную недвижимость в ближайшие два года, чтобы использовать полученный капитал для приобритения новой"
    ) {
      setMaxFinance(price * 0.7);
    }
  };

  const paymentCalculation = () => {
    const ann = calc(loan, duration * 12, rate);
    setMonthlyPayment(Number(ann));
  };

  return (
    <div className={calculatorStyles.container}>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1 className={calculatorStyles.header}>
          Рассчитайте ипотеку быстро и просто
        </h1>
        <div className={calculatorStyles.section_grid}>
          <div className={calculatorStyles.grid_item}>
            <Input
              title="Стоимость недвижимости"
              id="price"
              value={price}
              onChange={onChangePrice}
              max={10000000}
              errorText="Стоимость недвижимости не может превышать 10,000,000"
              isErrorActive={isErrorActive}
              error={priceError}
              currency
            />
          </div>
          <div className={calculatorStyles.grid_item}>
            {" "}
            <Select
              title="Город покупки недвижимости"
              id="city"
              list={cities}
              placeholder="Выберите город"
              onClickItem={setCity}
              value={city}
            />
          </div>
          <div className={calculatorStyles.grid_item}>
            {" "}
            <Select
              id="period"
              title="Когда вы планируете оформть ипотеку?"
              list={periods}
              placeholder="Выберите период"
              onClickItem={setPeriod}
              value={period}
            />
          </div>
          <div className={calculatorStyles.grid_item}>
            <Input
              title="Первоначальный взнос"
              id="downpayment"
              value={downPayment}
              onChange={onChangeDownPayment}
              setDownPayment={setDownPayment}
              percent={percent}
              min={Math.round((price * 25) / 100)}
              max={maxFinance}
              error={downpayError}
              isErrorActive={isErrorActive}
              setDownpayError={setDownpayError}
              setIsErrorActive={setIsErrorActive}
              price={price}
              errorText="Сумма первоначального взноса не может быть меньше 25% или больше 100% от стоимости недвижимости"
              slider
              currency
              info
            />
          </div>
          <div className={calculatorStyles.grid_item}>
            <Select
              title="Тип недвижимости"
              id="type"
              list={estateTypes}
              placeholder="Выберите тип недвижимости"
              onClickItem={setEstateType}
              value={estateType}
            />
          </div>
          <div className={calculatorStyles.grid_item}>
            <Select
              title="Вы уже владеете недвижимостью?"
              id="ownership"
              list={ownership}
              placeholder="Выберите ответ"
              onClickItem={setOwnershipType}
              value={ownershipType}
              setDownPayment={setDownPayment}
              price={price}
            />
          </div>
        </div>
        <div className={calculatorStyles.line}></div>
        <div className={calculatorStyles.section_grid}>
          <div className={calculatorStyles.grid_item}>
            {" "}
            <Input
              title="Срок"
              id="duration"
              value={duration}
              min={4}
              max={30}
              onChange={onChangeDuration}
              error={durationError}
              isErrorActive={isErrorActive}
              errorText="Cрок ипотеки не может превышать 30 лет"
              slider
              setDuration={setDuration}
              setIsErrorActive={setIsErrorActive}
              setDurationError={setDurationError}
            />
          </div>
          <div className={calculatorStyles.grid_item}>
            {" "}
            <Input
              title="Ежемесячный платеж"
              id="payment"
              loan={loan}
              value={monthlyPayment}
              onChange={onChangeMonthlyPayment}
              errorText={`Размер ежемесячного платежа не может быть меньше ${minPayment} иначе срок будет больше 30 лет`}
              min={minPayment}
              defaultValue={minPayment}
              max={maxPayment}
              error={monthlypaymentError}
              isErrorActive={isErrorActive}
              setMonthlyPayment={setMonthlyPayment}
              setIsErrorActive={setIsErrorActive}
              setDuration={setDuration}
              setDurationError={setDurationError}
              duration={duration}
              downPayment={downPayment}
              setMonthlypaymentError={setMonthlypaymentError}
              slider
              monthlyPayment
              currency
              info
            />
          </div>
        </div>
        <div className={calculatorStyles.line}></div>
        <div className={calculatorStyles.section_grid}>
          <div
            className={`${calculatorStyles.grid_item} ${calculatorStyles.grid_item_button}`}
          >
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
        </div>
      </form>
    </div>
  );
};
