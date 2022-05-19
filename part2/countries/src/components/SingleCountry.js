import axios from "axios";
import { useEffect, useState } from "react";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (Object.keys(weather).length === 0)
    return <h1>loading weather data</h1>; // awaits for weather data
  else
    return (
      <>
        <h2>{country.name.common}</h2>
        <p>Capital:{country.capital}</p>
        <p>Area code:{country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={"country's flag"} />
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt={"weather icon"}
        />
        <p>wind: {weather.wind.speed} m/s</p>
      </>
    );
};

export default SingleCountry;
