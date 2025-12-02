import React, { useState, useEffect } from "react";
import { X, Droplets, MapPin, Loader } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon.jsx";
import { fetchWeatherAndTime } from "../utils/apiUtils.js";
import '../styles.css';

// Placeholder for getting image URL (assuming files are placed in your public folder)
const getCityBackgroundUrl = (cityName) => {
  const normalizedName = cityName.toLowerCase().replace(/\s/g, '-').replace(/\(|\)/g, ''); 
  // Uses absolute path from the public directory
  return `url('/assets/backgrounds/${normalizedName}.jpg')`; 
};

export const CityCard = ({ city, onRemove }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data and update periodically
  const loadData = async () => {
    // Only set loading true on the initial call to avoid a loading flash every second
    if (!data) setLoading(true); 
    
    try {
      // Fetch live time and stable mocked weather data
      const result = await fetchWeatherAndTime(city.name, city.timezone);
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data for", city.name, error);
      setData(null); 
    } finally {
      // Set loading false once data is received
      setLoading(false); 
    }
  };

  useEffect(() => {
    // Load immediately on mount
    loadData();

    // Set interval to refresh time every 1 second (1000ms) for live seconds tick
    const intervalId = setInterval(loadData, 1000); 

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [city.name, city.timezone]); 


  // Handle Loading and Error State (This is the JSX block that MUST be here)
  if (loading || !data) {
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
  
  const { timeString, dateString, phase, weather } = data;

  return (
    <div className={`city-card ${phase}`} style={{ backgroundImage: getCityBackgroundUrl(city.name) }}> 
      
      <div className="card-image-overlay"></div>

      {/* Dynamic Background Art / Effects */}
      <div className="card-background-art">
        {phase === "night" ? (
          <div className="night-star-effect">✨</div>
        ) : (
          <div className="day-sun-effect"></div>
        )}
      </div>

      {/* Card Content Wrapper */}
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
          <button
            onClick={() => onRemove(city.name)}
            className="city-remove-btn"
          >
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