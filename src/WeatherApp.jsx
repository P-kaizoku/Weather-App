import React, { useState } from "react";

function WeatherApp() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState({});

  // Fetch the API key from environment variables
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  async function searchCity() {
    if (input.trim() === "") {
      alert("Please enter the city!");
      return;
    }
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}&aqi=yes`
      );
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      setResult(data);
      setInput("");
    } catch (error) {
      setResult({ Error: error.message });
    }
  }

  return (
    <>
      <h2>Weather-Forecaster</h2>

      <div className="main">
        <input
          type="text"
          placeholder="Enter the city..."
          id="city"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchCity();
            }
          }}
        />

        <button type="submit" id="search-btn" onClick={searchCity}>
          Search
        </button>
      </div>

      <div className="display">
        {result.current && (
          <div>
            <h3>
              {result.location.name}, {result.location.country}
            </h3>
            <p>Temperature: {result.current.temp_c}°C</p>
            <p>Condition: {result.current.condition.text}</p>
            <img src={result.current.condition.icon} alt="weather icon" />
            <p>Humidity: {result.current.humidity}%</p>
            <p>Wind: {result.current.wind_kph} kph</p>
          </div>
        )}
        {result.Error && (
          <div>
            <p>{result.Error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default WeatherApp;
