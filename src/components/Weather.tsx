import { FC, useState, FormEventHandler } from "react";
import clear from "../assets/images/clear.jpg";
import clouds from "../assets/images/clouds.jpg";
import fog from "../assets/images/fog.jpg";
import snow from "../assets/images/snow.jpg";
import rain from "../assets/images/rain.jpg";
import thunderstorm from "../assets/images/thunderstorm.jpg";

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

  const backgroundImage = (main: string): string => {
    if (main === "Thunderstorm" || main === "Squall" || main === "Tornado") {
      return thunderstorm;
    } else if (main === "Rain" || main === "Drizzle") {
      return rain;
    } else if (main === "Snow") {
      return snow;
    } else if (main === "Clear") {
      return clear;
    } else if (main === "Clouds") {
      return clouds;
    } else {
      return fog;
    }
  };

  return (
    <>
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
        {data !== undefined && (
          <div className="container">
            <style>{`body { background-image: url(${backgroundImage(
              data.weather[0].main
            )}); }`}</style>
            <div className="weather-box">
              <h2 className="item">
                {data.name}, {data.sys.country}
              </h2>
              <h2 className="item description">
                {data.weather[0].description}
              </h2>
              <h2 className="item">{Math.round(data.main.temp)} °C</h2>
              <img
                className="icon"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              ></img>

              <h2 className="item">Max: {Math.round(data.main.temp_max)} °C</h2>
              <h2 className="item">Min: {Math.round(data.main.temp_min)} °C</h2>
              <h2 className="item">
                Perceived: {Math.round(data.main.feels_like)} °C
              </h2>
              <h2 className="item">
                Humidity: {Math.round(data.main.humidity)}%
              </h2>
              <h2 className="item">
                Wind speed: {Math.round(data.wind.speed * 3.6)} km/h
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
