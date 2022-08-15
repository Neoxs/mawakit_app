import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="logo">Mawakit</h1>
        <p className="subtitle">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam ex
          iure esse obcaecati at omnis quam asperiores enim eaque excepturi!
        </p>
      </div>
      <div className="search">
        <input type="date" className="search__date" />
        <input type="text" className="search__country" />
        <button type="submit">show</button>
      </div>
      <div className="result">
        <span className="result__sunrise">Sunrise is at: 7:54</span>
        <span className="result__sunset">Sunrise is at: 16:06</span>
      </div>
    </div>
  );
}

export default App;
