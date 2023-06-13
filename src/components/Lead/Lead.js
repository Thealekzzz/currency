import React, { useEffect, useState } from 'react';

import DropdownMenu from '../Dropdown/Dropdown';

import styles from "./Lead.module.css";
import reverseIcon from "./images/reverse.svg";
import infoIcon from "./images/info.svg";
import formatDate from '../../utils/formatDate';

const Lead = ({ currencies, currencyTo, currencyFrom, setCurrencyFrom, setCurrencyTo }) => {
  
  const currenciesName = {
    EUR: "Euro",
    USD: "US Dollar",
    JPY: "Japanese Yen",
    BGN: "Bulgarian Lev",
    CZK: "Czech Republic Koruna",
    DKK: "Danish Krone",
    GBP: "British Pound Sterling",
    HUF: "Hungarian Forint",
    PLN: "Polish Zloty",
    RON: "Romanian Leu",
    SEK: "Swedish Krona",
    CHF: "Swiss Franc",
    ISK: "Icelandic Króna",
    NOK: "Norwegian Krone",
    HRK: "Croatian Kuna",
    RUB: "Russian Ruble",
    TRY: "Turkish Lira",
    AUD: "Australian Dollar",
    BRL: "Brazilian Real",
    CAD: "Canadian Dollar",
    CNY: "Chinese Yuan",
    HKD: "Hong Kong Dollar",
    IDR: "Indonesian Rupiah",
    ILS: "Israeli New Sheqel",
    INR: "Indian Rupee",
    KRW: "South Korean Won",
    MXN: "Mexican Peso",
    MYR: "Malaysian Ringgit",
    NZD: "New Zealand Dollar",
    PHP: "Philippine Peso",
    SGD: "Singapore Dollar",
    THB: "Thai Baht",
    ZAR: "South African Rand",
  }

  function handleInputChange(evt) {
    if (!isNaN(+evt.target.value) && evt.target.value[evt.target.value.length - 1] !== " ") {
      setInputValue(evt.target.value);
    }
  }

  function handleReverseButtonClick(evt) {
    setTimeout(() => {
      const tempCurrency = currencyFrom;
      setCurrencyFrom(currencyTo);
      setCurrencyTo(tempCurrency);
      setInputValue(convertedValue.toFixed(4));
      
    }, 100);
    
  }

  const [inputValue, setInputValue] = useState(10);
  const [convertedValue, setConvertedValue] = useState();

  useEffect(() => {
    setConvertedValue((inputValue * currencies?.[currencyFrom]?.currencies[currencyTo] || 0));
  }, [currencies, inputValue, currencyFrom, currencyTo]);

  return (
    <div className={styles.lead}>
      <div className={styles.top}>
        <input placeholder='Type your amount' type="text" className={styles.input} value={inputValue} onChange={handleInputChange} />

        <DropdownMenu options={Object.keys(currenciesName)} onSelect={setCurrencyFrom} selectedOption={currencyFrom} />
        <img src={reverseIcon} onClick={handleReverseButtonClick} alt="Reverse currency, button" className={styles.reverseIcon} />
        <DropdownMenu options={Object.keys(currenciesName)} onSelect={setCurrencyTo} selectedOption={currencyTo} />

      </div>

      <div className={styles.center}>
        <p className={styles.regularText}>
          <span>{inputValue || 0}</span> <span>{currenciesName[currencyFrom]}</span> is
        </p>
        <p className={styles.boldText} style={{margin: "3px 0 20px 0"}}>
          <span>{(convertedValue || 0).toFixed(4)}</span> <span className={styles.regularText}>{currenciesName[currencyTo]}{convertedValue !== 1 && "s"}</span>
        </p>
        <p className={styles.regularText}>
          <span>1</span> <span>{currencyFrom}</span> <span>—</span> <span>{(currencies?.[currencyFrom]?.currencies?.[currencyTo] || 0).toFixed(4)}</span> <span>{currencyTo}</span>
        </p>
        <p className={styles.regularText}>
          <span>1</span> <span>{currencyTo}</span> <span>—</span> <span>{(1 / currencies?.[currencyFrom]?.currencies?.[currencyTo] || 0).toFixed(4)}</span> <span>{currencyFrom}</span>
        </p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.infoBlock}>
          <img src={infoIcon} alt="" />
          <p>For information purposes only. When transferring money, check the exchange rate in your bank</p>
        </div>
        {/* <button className={styles.button}>Convert</button> */}
        <p className={styles.regularText}>last update: {formatDate(currencies?.[currencyFrom]?.lastUpdate || 0)}</p>
      </div>
    </div>
  );
};

export default Lead;