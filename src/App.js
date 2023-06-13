import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Lead from "./components/Lead/Lead";

function App() {
  const token = "tTL31BwwZOqJzA7PXf7AfqCjJfFe5zDdMiY9Nn5N";

  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const [currencies, setCurrencies] = useState(JSON.parse(localStorage.getItem("currencies")));
  // { "USD": {
  //    lastUpdate: 124241521, 
  //    currencies: {
  //      "EUR": 0.989, 
  //      ...
  //    }, 
  //   ...
  // }


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

  return (
    <>
      <div className={styles.header}></div>
      <Lead currencies={currencies} currencyTo={currencyTo} currencyFrom={currencyFrom} setCurrencyFrom={setCurrencyFrom} setCurrencyTo={setCurrencyTo} />
      
    </>
  );
}

export default App;
