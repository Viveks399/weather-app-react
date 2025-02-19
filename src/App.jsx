import { useState } from "react";
import axios from "axios";

function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [display, setDisplay] = useState(false);

  const handleCityName = (e) => {
    setCity(e.target.value);
  };

  const clear = () => {
    setCity("");
    setDisplay(false);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (response.status === 200) {
        setWeather(response.data);
        setDisplay(true);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error fetching weather", error);
      alert("City not found");
      setCity("");
      setDisplay(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-100 to-orange-200 flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Weather App
        </h1>

        <div className="flex mt-4">
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-l-md focus:outline-none"
            placeholder="Enter city..."
            onChange={handleCityName}
            value={city}
          />
          <button
            onClick={fetchWeather}
            className="px-4 bg-blue-500 text-white font-medium rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
          <div className="flex justify-center items-center">
            <button
              onClick={clear}
              className="border ml-1 px-1 cursor-pointer rounded-2xl"
            >
              X
            </button>
          </div>
        </div>

        {display ? (
          <div className="mt-6 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-200 flex items-center justify-center rounded-full">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
              />
            </div>

            <p className="text-3xl font-bold mt-2">{weather?.main?.temp}°C</p>
            <p className=" font-medium text-2xl mt-1">
              {weather?.weather[0]?.description}
            </p>
            <p className="text-gray-500 mt-1 font-medium">
              {weather?.name}, {weather?.sys?.country}
            </p>
            <p className="text-gray-600">
              Feels like {weather?.main?.feels_like}°C
            </p>

            <p className="text-gray-600 text-sm mt-1">
              Min: {weather?.main?.temp_min}°C | Max: {weather?.main?.temp_max}
              °C
            </p>
          </div>
        ) : (
          <p className="mt-4 text-gray-500 text-center">Search for a city</p>
        )}
      </div>
    </div>
  );
}

export default App;
