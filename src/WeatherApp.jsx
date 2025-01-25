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
    <div className="bg-neutral-600 min-h-3/4 h-max w-3/5 text-white p-6 flex flex-col items-center  rounded-xl drop-shadow-[0_35px_35px_rgba(255,255,255,0.50)] ">
      <h2 className="w-3/4 p-2 text-center m-4 font-bold text-2xl ">Weather-Forecaster</h2>

      <div className="main bg-neutral-500 px-4 py-6 rounded-2xl flex gap-4">
        <input
          className=" outline-none text-lg"
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

      <div className="display bg-neutral-500 m-6 p-6 w-3/4 rounded-2xl">
        {result.current && (
          <div>
            <h3 className="font-bold text-xl">
              {result.location.name}, {result.location.country}
            </h3>
            <p className="mt-2 font-mono">Temperature: {result.current.temp_c}°C</p>
            <p className="font-mono">Condition: {result.current.condition.text}</p>
            <img className="" src={result.current.condition.icon} alt="weather icon" />
            <p className="font-mono">Humidity: {result.current.humidity}%</p>
            <p className="font-mono">Wind: {result.current.wind_kph} kph</p>
          </div>
        )}
        {result.Error && (
          <div>
            <p>{result.Error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
