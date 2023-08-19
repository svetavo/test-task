import { useEffect } from "react";
import { useState } from "react";
import calculatorStyles from "./Calculator.module.css";
import { Input } from "./Input/Input";
import { Select } from "./Select/Select";
import { cities, period, estateType, ownership } from "../../data/data";

export const Calculator = () => {
  const [price, setPrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState();
  const [percent, setPercent] = useState();

  const onChangePrice = (e) => {
    setPrice(Number(e.target.value));
  };
  const onChangeDownPayment = (e) => {
    setDownPayment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(price, downPayment);
  };

  useEffect(() => {
    setDownPayment(price / 2);
  }, [price]);

  useEffect(() => {
    setPercent(Math.floor((downPayment * 100) / price));
  }, [downPayment]);

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
              numbers={price}
              onChange={onChangePrice}
              currency
            />
            <Input
              title="Первоначальный взнос"
              numbers={downPayment}
              onChange={onChangeDownPayment}
              percent={percent}
              currency
              info
            />
          </div>
          <div className={calculatorStyles.column}>
            <Select
              title="Город покупки недвижимости"
              list={cities}
              placeholder="Выберите город"
            />
            <Select
              title="Тип недвижимости"
              list={estateType}
              placeholder="Выберите тип недвижимости"
            />
          </div>
          <div className={calculatorStyles.column}>
            <Select
              title="Когда вы планируете оформть ипотеку?"
              list={period}
              placeholder="Выберите период"
            />
            <Select
              title="Вы уже владеете недвижимостью?"
              list={ownership}
              placeholder="Выберите ответ"
            />
          </div>
        </div>
        <div></div>
        <button type="submit">Продолжить</button>
      </form>
    </div>
  );
};
