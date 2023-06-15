import { useState, useEffect } from "react";
import { colorByCurrency, currenciesName, token } from "./data/data.js";

import styles from "./App.module.css";

import Lead from "./components/Lead/Lead";
import mixColor from "./utils/mixColor.js";
import CurrenciesList from "./components/CurrenciesList/CurrenciesList.js";

function App() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const [colors, setColors] = useState({ from: "#4926AD", to: "#4926AD" });

  const [currencies, setCurrencies] = useState(JSON.parse(localStorage.getItem("currencies")));


  async function updateCurrenciesByBase(base) {
    return fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${token}&base_currency=${base}`)
      .then(res => res.json())
      .then(data => {
        console.log("Обновленные данные: ", data);

        setCurrencies(prev => {
          const current = {
            ...prev,
            [base]: {
              lastUpdate: new Date().getTime(),
              currencies: data.data
            }
          }

          localStorage.setItem("currencies", JSON.stringify(current));

          return current;
        });
      });
  }

  useEffect(() => {
    async function checkCurrenciesByBase(base) {
      const timeNow = new Date().getTime();

      if (currencies?.[base]) {
        if (currencies?.[base].lastUpdate < timeNow - 10 * 60 * 1000) {
          console.log("Данных устарели, обновляю.");
          await updateCurrenciesByBase(base);

        } else {
          console.log("Данные актуальны");

        }
      } else {
        console.log("Данных нет, обновляю.");
        await updateCurrenciesByBase(base);

      }
    }

    checkCurrenciesByBase(currencyFrom);

  }, [currencyFrom, currencies]);

  useEffect(() => {
    setColors(prev => ({ ...prev, from: mixColor("#4926AD", colorByCurrency[currencyFrom]) }));
  }, [currencyFrom]);

  useEffect(() => {
    setColors(prev => ({ ...prev, to: mixColor("#4926AD", colorByCurrency[currencyTo]) }));
  }, [currencyTo]);

  return (
    <>
      <div
        className={styles.header}
        style={{
          backgroundImage: `linear-gradient(70deg, ${colors.from}, ${colors.to})`,
          transition: "background-image 2s"
        }}
      ></div>
      <Lead currencies={currencies} currencyTo={currencyTo} currencyFrom={currencyFrom} setCurrencyFrom={setCurrencyFrom} setCurrencyTo={setCurrencyTo} />
      <CurrenciesList currencies={currencies} currencyTo={currencyTo} currencyFrom={currencyFrom}/>
    </>
  );
}

export default App;
