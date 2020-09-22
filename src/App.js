import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [data, setData] = useState({});
  const [atribute, setAtribute] = useState("")
  const [key, setKey] = useState("host")


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:4000/file',
      )
      const obj = result.data
    setAtribute(obj["host"])
    return setData(obj);
  }
    fetchData();
  }, []);

const getElement = (e) => {
  setKey(e.target.value);
  setAtribute(data[e.target.value]);
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>CONFIG PARSER</h1>
        <label for="config">Pick a key value</label>
        <select onChange={getElement}name="config" id="config">
          {Object.keys(data).map((el, i) =>
            <option key={i} value={el}>{el}</option>
          )}
        </select>
          <p> the value associated with {key} is <strong>{atribute}</strong></p>
      </header>
    </div>
  );

}
export default App;