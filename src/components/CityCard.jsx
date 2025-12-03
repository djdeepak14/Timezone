import React, { useState, useEffect } from "react";
import { X, Droplets, MapPin, Loader } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon.jsx";
import { fetchWeatherAndTime } from "../utils/apiUtils.js";
import '../styles.css';

// Helper: Get city background from public folder
const getCityBackgroundUrl = (cityName) => {
  const normalizedName = cityName.toLowerCase().replace(/\s/g, '-').replace(/\(|\)/g, ''); 
  return `url('/assets/backgrounds/${normalizedName}.jpg')`; 
};

export const CityCard = ({ city, onRemove }) => {
  const [weatherData, setWeatherData] = useState(null); // weather + base info
  const [timeData, setTimeData] = useState({
    timeString: "",
    dateString: "",
    phase: "day",
  });
  const [loading, setLoading] = useState(true);

  // ------------------------
  // 1. Fetch weather (every 10 min)
  // ------------------------
  const loadWeather = async () => {
    try {
      const data = await fetchWeatherAndTime(city.name, city.timezone);
      setWeatherData(data.weather); // weather part only
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch weather for", city.name, err);
      setWeatherData(null);
      setLoading(false);
    }
  };

  // ------------------------
  // 2. Update time every second
  // ------------------------
  const updateTime = () => {
    const now = new Date();

    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: city.timezone,
    });

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: city.timezone,
    });

    const hourFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: city.timezone,
    });

    const currentHour = parseInt(hourFormatter.format(now), 10);

    let phase = "day";
    if (currentHour >= 5 && currentHour < 8) phase = "sunrise";
    else if (currentHour >= 8 && currentHour < 17) phase = "day";
    else if (currentHour >= 17 && currentHour < 20) phase = "sunset";
    else phase = "night";

    setTimeData({
      timeString: timeFormatter.format(now),
      dateString: dateFormatter.format(now),
      phase,
    });
  };

  // ------------------------
  // 3. useEffect hooks
  // ------------------------
  useEffect(() => {
    loadWeather(); // initial weather fetch

    // Refresh weather every 10 minutes
    const weatherInterval = setInterval(loadWeather, 10 * 60 * 1000);

    return () => clearInterval(weatherInterval);
  }, [city.name, city.timezone]);

  useEffect(() => {
    updateTime(); // initial time
    const timeInterval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(timeInterval);
  }, [city.timezone]);

  // ------------------------
  // 4. Render loading state
  // ------------------------
  if (loading || !weatherData) {
    return (
      <div className={`city-card night loading-card`}>
        <div className="loading-content">
          <Loader size={32} className="spinner" />
          <p>Loading real-time data for {city.name}...</p>
        </div>
        <button onClick={() => onRemove(city.name)} className="city-remove-btn">
          <X size={18} />
        </button>
      </div>
    );
  }

  // ------------------------
  // 5. Render City Card
  // ------------------------
  const { timeString, dateString, phase } = timeData;
  const { temp, condition, humidity } = weatherData;

  return (
    <div className={`city-card ${phase}`} style={{ backgroundImage: getCityBackgroundUrl(city.name) }}>
      <div className="card-image-overlay"></div>

      {/* Background Art */}
      <div className="card-background-art">
        {phase === "night" ? (
          <div className="night-star-effect">✨</div>
        ) : (
          <div className="day-sun-effect"></div>
        )}
      </div>

      {/* Card Content */}
      <div className="card-content-wrapper">
        {/* Header */}
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

        {/* Time & Date */}
        <div className="card-time-section">
          <div className="time">{timeString}</div>
          <p className="date">{dateString}</p>
        </div>

        {/* Weather Info */}
        <div className="weather-info">
          <div className="weather-summary">
            <WeatherIcon condition={condition} className="weather-icon-small" />
            <div>
              <p className="temp">{temp}°C</p>
              <p className="condition">{condition}</p>
            </div>
          </div>
          <div className="weather-details">
            <div className="humidity">
              <Droplets size={12} /> {humidity}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
