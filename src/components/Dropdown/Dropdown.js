import React, { useState } from "react";

import styles from "./Dropdown.module.css";
import arrowIcon from "./imgs/arrow.svg";

const DropdownMenu = ({ options, onSelect, selectedOption = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownMenu}>
      <button className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.dropdownValueWrapper}>
          <span>{selectedOption || "Select an option"}</span>
          <img src={require(`../../images/flags/${selectedOption.slice(0, 2)}.svg`)} height={20} width={20} alt="" />

        </div>
        <img src={arrowIcon} className={styles.arrow} style={{transform: `rotateZ(${isOpen ? "90deg" : 0})`}} alt="" />
      </button>

      <ul className={[styles.options, !isOpen && styles.hidden].join(" ")} >
        {options.map((option) => (
          <li className={styles.option} key={option} onClick={() => handleOptionClick(option)}>
            {option}
            <img src={require(`../../images/flags/${option.slice(0, 2)}.svg`)} height={20} width={20} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;