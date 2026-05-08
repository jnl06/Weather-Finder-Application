import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ebffee8a251dac8a6101e0464f3c592f";

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

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) <p>Loading...</p>;
  if (error) <p>City not found: {error}</p>;

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
        <button onClick={getWeather}>Get Weather</button>
      </div>
      <div className='error'>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
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