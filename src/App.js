// React - лучшая реклама Vue

import './App.css';
import {useEffect, useRef, useState} from "react";
import TrueDB from "./api/TrueDB";
import { dateMap } from "./utils";

function App() {
  const dateRef = useRef();
  const kmRef = useRef();
  const [data, setData] = useState([]);

  TrueDB.init();

  useEffect(() => {
    sort();
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    const date = dateRef.current.value;
    let km = kmRef.current.value;
    TrueDB.set(date, km);
    sort()
  }

  function deleteHandler(id) {
    TrueDB.delete(id);
    sort();
  }

  function sort() {
      const db = TrueDB.get();
      const sorted = db.sort((a, b) => {
        const prev = Number(a.date.split('-').join(''));
        const curr = Number(b.date.split('-').join(''));
        return prev < curr ? 1 : -1;
      });

      const normalized = sorted.map((item) => {
        const parsedDate = item.date.split('-');
        return {
          id: item.date,
          date: `${parsedDate[2]} ${dateMap[parsedDate[1]]} ${parsedDate[0]}`,
          km: item.km,
        }
      });
      setData(normalized)
  }

  return (
    <div className="App">
      <div className="wrapper">
        <form id="form" onSubmit={submitHandler}>
          <div className="form__row">
            <label className="form__row-label">
              <span className="form-description">Дата</span>
              <input type="date" className="form__row-date__input" required={true} ref={dateRef} />
            </label>
            <label className="form__row-label">
              <span className="form-description">Пройдено, км.</span>
              <input type="number" className="form__row-date__input" required={true} ref={kmRef} />
            </label>
            <button type="submit">OK</button>
          </div>
        </form>
        <div id="form-output">
          <div className="form__row">
            <span className="form__description">Дата</span>
            <span className="form__description">Пройдено, км.</span>
            <span className="form__description">Действия</span>
          </div>
          { data.map((el) =>
              <div className="output__row" key={el.date}>
                <span className="output__item">{el.date}</span>
                <span className="output__item">{el.km}</span>
                <span className="output__item delete-item" onClick={() => deleteHandler(el.id)}> X </span>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
