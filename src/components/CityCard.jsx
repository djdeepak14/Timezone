import React, { useState, useEffect } from "react";
import { X, Droplets, MapPin, Loader } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon.jsx";
import { getTimeData, getDayPhase, getSimulatedWeather } from "../utils/apiUtils.js";
import '../styles.css';

const getCityBackgroundUrl = (cityName) => {
  const normalizedName = cityName.toLowerCase().replace(/\s/g, '-').replace(/\(|\)/g, '');
  return `url('/assets/backgrounds/${normalizedName}.jpg')`;
};

export const CityCard = ({ city, onRemove }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = () => {
      // For coordinate cities, simulate weather/time locally
      if (city.name.startsWith("Lat") && city.name.includes("Lon")) {
        const timeData = getTimeData(city.timezone || "UTC");
        const phase = getDayPhase(timeData.hour);
        const weather = getSimulatedWeather(city, timeData.hour);
        setData({
          ...city,
          timeString: timeData.timeString,
          dateString: timeData.dateString,
          phase,
          weather,
        });
        return;
      }

      // Otherwise, you can still call API for normal cities
      try {
        const timeData = getTimeData(city.timezone);
        const phase = getDayPhase(timeData.hour);
        const weather = getSimulatedWeather(city, timeData.hour);
        setData({
          ...city,
          timeString: timeData.timeString,
          dateString: timeData.dateString,
          phase,
          weather,
        });
      } catch (err) {
        console.error("Failed to load city data:", city.name, err);
        setData(null);
      }
    };

    loadData();
    const intervalId = setInterval(loadData, 1000); // live clock

    return () => clearInterval(intervalId);
  }, [city]);

  if (!data) {
    return (
      <div className="city-card loading-card">
        <Loader size={32} className="spinner" />
        <p>Loading {city.name}...</p>
        <button onClick={() => onRemove(city.name)} className="city-remove-btn">
          <X size={18} />
        </button>
      </div>
    );
  }

  const { timeString, dateString, phase, weather } = data;

  return (
    <div className={`city-card ${phase}`} style={{ backgroundImage: getCityBackgroundUrl(city.name) }}>
      <div className="card-image-overlay"></div>

      <div className="card-background-art">
        {phase === "night" ? <div className="night-star-effect">✨</div> : <div className="day-sun-effect"></div>}
      </div>

      <div className="card-content-wrapper">
        <div className="card-header-section">
          <div>
            <h2 className="city-name-title">
              <MapPin size={16} />
              {city.name}
            </h2>
            <p className="city-country">{city.country}</p>
          </div>
          <button onClick={() => onRemove(city.name)} className="city-remove-btn">
            <X size={18} />
          </button>
        </div>

        <div className="card-time-section">
          <div className="time">{timeString}</div>
          <p className="date">{dateString}</p>
        </div>

        <div className="weather-info">
          <div className="weather-summary">
            <WeatherIcon condition={weather.condition} className="weather-icon-small" />
            <div>
              <p className="temp">{weather.temp}°C</p>
              <p className="condition">{weather.condition}</p>
            </div>
          </div>
          <div className="weather-details">
            <div className="humidity">
              <Droplets size={12} /> {weather.humidity}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
