import { FC, useState, FormEventHandler } from "react";

type Api = {
  key: string;
  url: string;
};

type Response = {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  name: string;
};

const api: Api = {
  key: import.meta.env.VITE_API_KEY,
  url: "https://api.openweathermap.org/data/2.5/",
};

const Weather: FC = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Response>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetch(`${api.url}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((response) => response.json())
      .then((data: Response) => {
        setData(data);
        setSearch("");
      })
      .catch((error) => console.log(`Error ${error}`));
  };

  return (
    <div>
      <header className="header">
        <h1>Weather App</h1>
      </header>
      <form className="search-box" onSubmit={handleSubmit}>
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
