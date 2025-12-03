// src/components/AddCityModal.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { AVAILABLE_CITIES } from "../data/cities.js";
// Assuming these utility functions are correctly defined and imported
import { getTimeData, getDayPhase, getSimulatedWeather } from '../utils/apiUtils.js'; 
import '../styles.css';

// The CORS_PROXY is intentionally removed. We rely on the Vite dev server proxy.
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const AddCityModal = ({ isOpen, onClose, onAdd, currentCities }) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const results = AVAILABLE_CITIES.filter(city => {
      const matchName = city.name.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === 'All' || city.region === region;
      return matchName && matchRegion;
    });
    const currentCityNames = currentCities.map(c => c.name);
    // Filter out cities already added
    setSearchResults(results.filter(city => !currentCityNames.includes(city.name)));
  }, [search, region, currentCities]);

  const handleAddByCoordinates = async () => {
    if (!lat || !lon) {
        setError('Please enter both latitude and longitude.');
        return;
    }
    setLoading(true);
    setError('');

    try {
      // 🎯 MODIFIED: Fetching from the local path '/api/geocode'
      // This path is configured in vite.config.js to be proxied to:
      // https://geocoding-api.open-meteo.com
      const apiPath = `/api/geocode/v1/reverse?latitude=${lat}&longitude=${lon}&language=en`;
      const res = await fetch(apiPath);
      
      if (!res.ok) {
        console.error('API Fetch failed with status:', res.status, res.statusText);
        // Throwing a new error to be caught by the catch block below
        throw new Error('Network error or API refused the request.'); 
      }

      const data = await res.json();
      
      // Check if the Geocoding API returned any results
      if (!data?.results || data.results.length === 0) {
        throw new Error('No city found for the given coordinates.');
      }

      // Destructure and validate the required fields
      const { 
        name: cityName, 
        country, 
        timezone,
        latitude: actualLat, // Use actual lat/lon from API for accuracy
        longitude: actualLon 
      } = data.results[0];

      const cityObj = {
        name: cityName,
        country,
        timezone,
        baseTemp: 20, // Example static data
        climate: 'temperate', // Example static data
        region: 'Other', // Example static data
        latitude: actualLat, // Storing the confirmed coordinates
        longitude: actualLon,
      };

      // Existing utility functions for time and simulated weather
      const timeData = getTimeData(timezone);
      const phase = getDayPhase(timeData.hour);
      const weather = getSimulatedWeather(cityObj, timeData.hour);

      onAdd({
        ...cityObj,
        timeString: timeData.timeString,
        dateString: timeData.dateString,
        phase,
        weather,
      });

      // Clear state and close on success
      setLat('');
      setLon('');
      setSearch('');
      onClose();
      
    } catch (err) {
      console.error("Error in handleAddByCoordinates:", err);
      // Display a clearer error message to the user
      setError(`Failed to fetch city data: ${err.message}. Please check your coordinates and proxy setup.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add City</h3>
          <button onClick={onClose} className="modal-close-btn">✕</button>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <input 
            placeholder="Search city..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="search-input" 
          />
        </div>

        <div className="regions-filter">
          {['All', 'Asia', 'Europe', 'North America', 'Australia', 'Middle East'].map(r => (
            <button 
              key={r} 
              className={region===r?'region-btn active':'region-btn'} 
              onClick={() => setRegion(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="city-list-container">
          {searchResults.length === 0 && search.length > 0 ? (
            <p className="no-results-msg">No cities found matching "{search}" in {region}.</p>
          ) : searchResults.length === 0 && search.length === 0 ? (
            <p className="no-results-msg">Select a region or start searching.</p>
          ) : (
            searchResults.map(city => (
              <button 
                key={city.name} 
                className="city-list-item" 
                onClick={() => { onAdd(city); onClose(); }}
              >
                <span className="city-list-name">{city.name} ({city.country})</span>
                <Plus size={16} className="city-list-icon" />
              </button>
            ))
          )}
        </div>

        <hr />

        {/* Add by coordinates */}
        <div className="coordinate-inputs">
          <h4>Add by Coordinates</h4>
          <input 
            type="number" 
            placeholder="Latitude (e.g., 60.1699)" 
            value={lat} 
            onChange={e=>setLat(e.target.value)} 
            className="coordinate-input"
          />
          <input 
            type="number" 
            placeholder="Longitude (e.g., 24.9384)" 
            value={lon} 
            onChange={e=>setLon(e.target.value)} 
            className="coordinate-input"
          />
          <button 
            onClick={handleAddByCoordinates} 
            disabled={loading || !lat || !lon}
          >
            {loading ? 'Adding...' : 'Add City'}
          </button>
          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
    </div>
  );
};