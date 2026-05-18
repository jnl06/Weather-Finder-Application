import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (response.status === 404) {
        throw new Error("City not found");
      }

      if (response.status === 429) {
        throw new Error("Too many requests. Try again later");
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <h1>Weather Finder App</h1>

      <div className='input'>
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>
          Get Weather
        </button>
      </div>

      {loading && <h2>Loading...</h2>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {weather && (
        <div className='display'>
          <h2>{weather.name}</h2>
          <p>{weather.main.temp} °C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;