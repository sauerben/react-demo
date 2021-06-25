import { useState, useEffect } from "react";
import ReactJson from "react-json-view";
import Draggable from "react-draggable";

import "./App.css";
import Config from "./Config";
import Button from "./Button";

function App() {
  const [activeOptions, setActiveOptions] = useState([]);
  const [data, setData] = useState(false);

  const toggleOption = (option) => {
    if (!activeOptions.includes(option)) {
      setActiveOptions([...activeOptions, option]);
    } else {
      setActiveOptions(activeOptions.filter((item) => item != option));
    }
  };

  const fetchApi = () => {
    fetch(`https://swapi.dev/api/people/${activeOptions[0] || 1}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchApi();
  }, [activeOptions]);

  return (
    <div className="App">
      <header className="App-header">
        {Config.questions.map((question) => {
          return (
            <div>
              <p>{question.text}</p>
              {question.options.map((option) => (
                <Button
                  active={activeOptions.includes(option)}
                  toggle={() => toggleOption(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          );
        })}

        <Button toggle={fetchApi}>Fetch!</Button>

        {data && <div>{data?.name}</div>}
      </header>
      <Draggable bounds="parent">
        <div className="draggable-wrapper">
          <div>
            {" "}
            <ReactJson src={{ activeOptions, data }} theme="monokai" />
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
