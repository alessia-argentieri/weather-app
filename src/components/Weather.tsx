import { FC, useState } from "react";

const Weather: FC = () => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <header className="header">
        <h1>Weather App</h1>
      </header>
      <form className="search-box">
        <input
          className="input"
          type="text"
          placeholder="Enter city"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Weather;
