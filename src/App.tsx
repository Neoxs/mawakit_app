import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

// I got the list of coutries from google api (https://developers.google.com/public-data/docs/canonical/countries_csv)
import countries from "./config/countries.json";

import { ReactChangeEvent, ReactSubmitEvent } from "./helpers/types";

function App() {
  // ===========================================================================
  // State
  // ===========================================================================
  const initState = {
    cords: "",
    date: "",
    sunrise: "",
    sunset: "",
    loading: false,
    synched: false,
  };
  const [data, setData] = useState(initState);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  // Format the list of countries into {value, label} for react-select options
  const options = countries.map((country) => {
    return {
      value: `lat=${country.latitude}&lng=${country.longitude}`,
      label: country.name,
    };
  });

  // Custom change event handler for react-select
  const handleSelect = (option: any) => {
    setData({
      ...data,
      cords: option.value,
    });
  };

  // change event handler for date
  // We can't use only one handler since the process changes
  const handleChange = (e: ReactChangeEvent) => {
    setData({
      ...data,
      date: e.target.value,
    });
  };

  // Submit hanlder to get the results from this api
  // https://sunrise-sunset.org/api
  const getResults = async (e: ReactSubmitEvent) => {
    e.preventDefault();

    setData({
      ...data,
      loading: true,
    });

    const res = await axios.get(
      `https://api.sunrise-sunset.org/json?${data.cords}&date=${
        data.date ? data.date : "today"
      }`
    );

    setData({
      ...data,
      sunrise: res.data.results.sunrise,
      sunset: res.data.results.sunset,
      synched: true,
      loading: false,
    });
  };

  return (
    <div className="App">
      <div className="side_one">
        <form className="search" onSubmit={getResults}>
          <div className="search__group">
            <label className="search__group-label" htmlFor="date">
              Select date
            </label>
            <input
              id="date"
              type="date"
              className="search__date"
              onChange={handleChange}
              required
            />
          </div>
          <div className="search__group">
            <label className="search__group-label" htmlFor="date">
              Select country
            </label>
            {/* React select input */}
            <Select
              id="country"
              className="search__country"
              onChange={handleSelect}
              options={options}
            />
            {/* React-Select are cool, unfortunaly you can't make the input required, therefore i am using this hidden input as alternative solution for this issue (https://github.com/JedWatson/react-select/issues/3140) */}
            <input
              type="text"
              onChange={() => false}
              autoComplete="off"
              style={{ opacity: 0, height: 0 }}
              value={data.cords}
              required
            />
          </div>
          <button className="search__btn" type="submit" disabled={data.loading}>
            {data.loading ? "Loading..." : "Show"}
          </button>
        </form>
        <hr />
        <div className="result">
          {!data.synched && (
            <img
              className="illustration-lost"
              src="/img/lost.svg"
              alt="illustration"
            />
          )}
          {data.synched && (
            <>
              <span className="result__sunrise">
                Sunrise is at: {data.sunrise} GMT ☀️
              </span>
              <span className="result__sunset">
                Sunset is at: {data.sunset} GMT 🌙
              </span>
            </>
          )}
        </div>
      </div>
      <div className="side_two">
        <div className="header">
          <h1 className="logo">Mawakit</h1>
          <p className="subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            ullam ratione unde enim non similique minima nihil laudantium modi
            officia.
          </p>
        </div>
        <img
          className="illustration"
          src="/img/camping.svg"
          alt="illustration"
        />
      </div>
    </div>
  );
}

export default App;
