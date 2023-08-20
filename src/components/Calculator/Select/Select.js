import { useState } from "react";
import { cities } from "../../../data/data";
import selectStyles from "./Select.module.css";
import searchIcon from "../../../images/search.svg";
import arrow from "../../../images/arrow.svg";

export const Select = ({ title, list, placeholder, value, onClickItem }) => {
  const [active, setActive] = useState(false);
  const [filteredList, setFilteredList] = new useState(list);

  const showDropdown = () => {
    setActive(true);
  };

  const hideDropdown = () => {
    setActive(false);
  };

  const onClick = (element) => {
    onClickItem(element);
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
            className={!active ? `${selectStyles.input_img}` : null}
          />
        </button>

        {active ? (
          <div id="dropdown" className={selectStyles.list}>
            {list === cities ? (
              <div className={selectStyles.search_input}>
                <img src={searchIcon} className={selectStyles.search_img} />
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
                  <p
                    className={selectStyles.list_element}
                    key={index}
                    onClick={() => onClick(element)}
                  >
                    {element}
                  </p>
                ))
              : filteredList.sort().map((element, index) => (
                  <p
                    className={selectStyles.list_element}
                    key={index}
                    onClick={() => onClick(element)}
                  >
                    {element}
                  </p>
                ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
