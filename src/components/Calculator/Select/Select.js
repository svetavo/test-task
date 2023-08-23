import { useState } from "react";
import { cities, ownership } from "../../../data/data";
import selectStyles from "./Select.module.css";
import calculatorStyles from '../../Calculator/Calculator.module.css';
import searchIcon from "../../../images/search.svg";
import arrow from "../../../images/arrow.svg";
import checkedIcon from "../../../images/check.svg";

export const Select = ({
  title,
  id,
  list,
  placeholder,
  value,
  price,
  onClickItem,
  setDownPayment
}) => {
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState("");
  const [filteredList, setFilteredList] = new useState(list);

  const showDropdown = () => {
    setActive(true);
  };

  const hideDropdown = () => {
    setActive(false);
  };

  const onClick = (element) => {
    onClickItem(element);
    setChecked(element);
    if (list === ownership) {
    setDownPayment(Math.round(price / 2))
    }
    hideDropdown();
  };

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...list];
    updatedList = updatedList.filter((item) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  const buttonStyles = () => {
    if (active) {
      return `${selectStyles.input_active} ${selectStyles.input}`;
    }
    if (value) {
      return `${selectStyles.input}`;
    }
    if (!value) {
      return `${selectStyles.input} ${selectStyles.input_disabled}`;
    }
  };

  return (
    <div className={selectStyles.item}>
      <h3 className={selectStyles.title}>{title}</h3>
      <div className={selectStyles.input_container}>
        <button
          type="button"
          className={buttonStyles()}
          onClick={active ? () => hideDropdown() : () => showDropdown()}
        >
          {value ? value : placeholder}{" "}
          <img
            src={arrow}
            alt="стрелка"
            className={!active ? `${selectStyles.input_img}` : null}
          />
        </button>

        {active ? (
          <div id="dropdown" className={selectStyles.list}>
            {id === "city" ? (
              <div className={selectStyles.search_input}>
                <img
                  src={searchIcon}
                  className={selectStyles.search_img}
                  alt="поиск"
                />
                <input
                  type="text"
                  placeholder="Поиск.."
                  className={selectStyles.search_bar}
                  onChange={filterBySearch}
                ></input>
              </div>
            ) : null}
            {list !== cities
              ? list.map((element, index) => (
                  <div className={selectStyles.list_element}>
                    <p key={index} onClick={() => onClick(element)}>
                      {element}{" "}
                    </p>
                    {checked === element ? <img src={checkedIcon} /> : null}
                  </div>
                ))
              : filteredList.sort().map((element, index) => (
                  <div className={selectStyles.list_element}>
                    <p key={index} onClick={() => onClick(element)}>
                      {element}{" "}
                    </p>{" "}
                    {checked === element ? <img src={checkedIcon} /> : null}
                  </div>
                ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
