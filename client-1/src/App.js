import React, { useState } from "react";
import axios from "axios";
import "./components/WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "d83e114857cd4123503c9b8b7c05b09f";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2 className="title">Weather App</h2>
      <div className="search-box">
        <input
          type="text"
          className="city-input"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3 className="city-name">{weather.name}, {weather.sys.country}</h3>
          <p className="temperature">Temperature: {weather.main.temp}°C</p>
          <p className="weather-description">Weather: {weather.weather[0].description}</p>
          <p className="humidity">Humidity: {weather.main.humidity}%</p>
          <p className="wind-speed">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
