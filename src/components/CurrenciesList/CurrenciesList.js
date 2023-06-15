import React from 'react';

import styles from "./CurrenciesList.module.css";
import { currenciesName } from '../../data/data.js';

const CurrenciesList = ({ currencies, currencyFrom }) => {
  return (
    <div className={styles.currenyListSection}>
      <h2 className={styles.sectionHeader}>1 {currenciesName[currencyFrom]} is</h2>
      <ul className={styles.currenyList}>
        {Object.keys(currenciesName).filter(el => el !== currencyFrom).map(currency => {
          return (
            <li key={currency} className={styles.currenyListItem}>
              <img src={require(`../../images/flags/${currency.slice(0, 2)}.svg`)} width={20} alt="" />
              <p>
                {(currencies?.[currencyFrom]?.currencies[currency] || 0).toFixed(4)}
                <span> {currency}</span>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default CurrenciesList;