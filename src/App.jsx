import React, { useState } from 'react';
import { Plus, Clock, Globe } from 'lucide-react';
import { CityCard } from "./components/CityCard.jsx";
import { AddCityModal } from "./components/AddCityModal.jsx";
import { AVAILABLE_CITIES } from "./data/cities.js"; 
import './styles.css';  

export default function App() {
  
  // Set initial cities using the full objects from the data file
  const [myCities, setMyCities] = useState([
    AVAILABLE_CITIES.find(c => c.name === "Kathmandu"),
    AVAILABLE_CITIES.find(c => c.name === "Tokyo"),
    AVAILABLE_CITIES.find(c => c.name === "New York (Queens)"),
    AVAILABLE_CITIES.find(c => c.name === "London"),
  ].filter(c => c)); // Filter out any cities not found, just in case

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCity = (city) => {
    // Ensure the city is not already added
    if (!myCities.find(c => c.name === city.name)) {
      setMyCities([...myCities, city]);
    }
  }
  const removeCity = (cityName) => setMyCities(myCities.filter(c => c.name !== cityName));

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <div className="logo-icon-wrapper">
            <Clock size={24} />
          </div>
          <div>
            <h1>Global Nepali Hub</h1>
            <p>Diaspora & Time Tracker</p>
          </div>
        </div>
        <button className="add-city-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> <span>Add City</span>
        </button>
      </header>

      <main className="main-grid">
        {myCities.length === 0 ? (
          <div className="empty-state">
            <Globe size={64} className="empty-icon" />
            <h3>No cities tracking</h3>
            <p>Add a location to see real-time data</p>
            <button className="add-city-btn" onClick={() => setIsModalOpen(true)}>Add your first city</button>
          </div>
        ) : (
          <div className="city-grid-wrapper">
            {myCities.map(city => (
              <CityCard key={city.name} city={city} onRemove={removeCity} />
            ))}

            <button className="add-city-card" onClick={() => setIsModalOpen(true)}>
              <div className="plus-circle">
                <Plus size={24} />
              </div>
              <span>Track new location</span>
            </button>
          </div>
        )}
      </main>

      <AddCityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addCity} 
        currentCities={myCities}
      />
    </div>
  );
}