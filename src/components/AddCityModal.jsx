import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { searchAvailableCities } from '../utils/apiUtils.js'; 
import '../styles.css'; 

export const AddCityModal = ({ isOpen, onClose, onAdd, currentCities }) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  
  // Use effect to run search whenever query or region changes
  useEffect(() => {
    const results = searchAvailableCities(search, region);
    // Filter out cities already added to the dashboard
    const currentCityNames = currentCities.map(c => c.name);
    setSearchResults(results.filter(city => !currentCityNames.includes(city.name)));
  }, [search, region, currentCities]);


  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add City</h3>
          <button onClick={onClose} className="modal-close-btn">✕</button>
        </div>

        <div className="search-wrapper">
          <input 
            placeholder="Search city..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="search-input"
          />
        </div>

        <div className="regions-filter">
          {/* Note: Added 'Australia' and 'Middle East' filters to align with your data */}
          {['All', 'Asia', 'Europe', 'America', 'Australia', 'Middle East'].map(r => (
            <button 
              key={r} 
              className={region === r ? 'region-btn active' : 'region-btn'} 
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
                onClick={() => { 
                  // Pass the complete city object, including the correct timezone
                  onAdd(city); 
                  onClose(); 
                }}
              >
                <span className="city-list-name">{city.name} ({city.country})</span>
                <Plus size={16} className="city-list-icon" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};