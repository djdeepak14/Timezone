import { AVAILABLE_CITIES } from '../data/cities.js'; 

// This file contains all the core logic for time calculation and data fetching (mocked).

/**
 * Normalizes condition text for icon mapping and realistic display.
 * @param {string} climate - The climate property from the city data (e.g., 'humid', 'rainy').
 * @returns {string} A normalized condition string.
 */
function getMockCondition(climate) {
    const commonConditions = {
        'rainy': ['Rain', 'Cloudy', 'Drizzle'],
        'cold': ['Cloudy', 'Snow', 'Mist'],
        'sunny': ['Clear', 'Sunny'],
        'temperate': ['Partly Cloudy', 'Clear', 'Windy'],
        'humid': ['Rain', 'Cloudy', 'Mist'],
        'dry': ['Clear', 'Sunny', 'Windy'],
        'warm': ['Sunny', 'Clear', 'Partly Cloudy'],
        'windy': ['Windy', 'Cloudy', 'Clear'],
        'variable': ['Rain', 'Sunny', 'Cloudy'],
        'desert': ['Clear', 'Sunny'],
        'hot': ['Clear', 'Sunny'],
    };
    
    const conditions = commonConditions[climate] || ['Clear', 'Cloudy'];
    return conditions[Math.floor(Math.random() * conditions.length)];
}

/**
 * Calculates the accurate local time (including seconds) and generates stable, mocked weather data.
 * @param {string} cityName - The name of the city.
 * @param {string} timezoneId - The IANA timezone string (e.g., 'America/New_York').
 */
export async function fetchWeatherAndTime(cityName, timezoneId) {
  
  // Find the base temperature and climate info from your list
  const cityInfo = AVAILABLE_CITIES.find(c => c.name === cityName) || {};
  const baseTemp = cityInfo.baseTemp || 20;
  const climate = cityInfo.climate || 'temperate';

  // --- 1. Calculate REAL LOCAL TIME (Instant and Live, including seconds) ---
  const now = new Date();
  
  // Time String: Displays hour, minute, and second in 12-hour format
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezoneId };
  
  // Date String
  const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: timezoneId };
  
  const timeString = now.toLocaleTimeString('en-US', timeOptions);
  const dateString = now.toLocaleDateString('en-US', dateOptions);
  
  // Get the local hour (24-hour format) for day phase calculation
  const hour = parseInt(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: timezoneId }).format(now));
  
  // 2. Determine phase based on the actual local hour
  let phase = 'day';
  if (hour >= 5 && hour < 7) phase = 'sunrise';
  else if (hour >= 18 && hour < 20) phase = 'sunset';
  else if (hour >= 20 || hour < 5) phase = 'night';

  // 3. Generate MOCKED WEATHER data
  const mockTemp = (baseTemp + Math.random() * 4 - 2).toFixed(0); 
  const mockCondition = getMockCondition(climate);
  const mockHumidity = (Math.random() * 30 + 50).toFixed(0);
  
  // 4. Return the combined stable data
  return {
    timeString,
    dateString,
    phase,
    weather: {
      temp: mockTemp,
      condition: mockCondition,
      humidity: mockHumidity,
    }
  };
}


/**
 * Determines the list of cities available for adding using the imported AVAILABLE_CITIES data.
 */
export const searchAvailableCities = (query, region) => {
    let results = AVAILABLE_CITIES;

    // Mapping modal filter names to the data's internal `region` tags
    const regionMapping = {
        'Asia': ['Nepal', 'Japan', 'Asia'], 
        'Europe': ['Europe'],
        'America': ['North America'],
        'Middle East': ['Middle East'],
        'Australia': ['Australia']
    };
    
    if (region !== 'All') {
        const allowedRegions = regionMapping[region] || [];
        results = results.filter(city => allowedRegions.includes(city.region) || city.region === region);
    }

    if (query) {
        results = results.filter(city => city.name.toLowerCase().includes(query.toLowerCase()));
    }
    
    return results;
};