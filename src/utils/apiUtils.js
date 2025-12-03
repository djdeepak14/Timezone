import { AVAILABLE_CITIES } from '../data/cities.js'; 

//------------------------------------------------------
// 1) TIME FUNCTIONS
//------------------------------------------------------

export const getTimeData = (timezone) => {
  const now = new Date();

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: timezone,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'short', day: 'numeric',
    timeZone: timezone,
  });

  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', hour12: false, timeZone: timezone,
  });

  return {
    timeString: timeFormatter.format(now),
    dateString: dateFormatter.format(now),
    hour: parseInt(hourFormatter.format(now), 10),
  };
};

export const getDayPhase = (hour) => {
  if (hour >= 5 && hour < 8) return 'sunrise';
  if (hour >= 8 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'sunset';
  return 'night';
};

//------------------------------------------------------
// 2) REAL WEATHER (OPEN METEO)
//------------------------------------------------------

export async function getRealWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");

    const data = await res.json();

    const temp = Math.round(data.current_weather.temperature);
    const wind = data.current_weather.windspeed;
    const humidity =
      data.hourly?.relative_humidity_2m?.[0] ??
      50;

    const conditionMap = {
      0: "Clear",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Cloudy",
      45: "Fog",
      48: "Fog",
      51: "Drizzle",
      53: "Drizzle",
      55: "Drizzle",
      61: "Rain",
      63: "Rain",
      65: "Rain",
      71: "Snow",
      73: "Snow",
      75: "Snow",
      80: "Rain Showers",
      81: "Rain Showers",
      82: "Rain Showers",
      95: "Thunderstorm",
      96: "Thunderstorm",
      99: "Thunderstorm",
    };

    const weathercode = data.current_weather.weathercode;
    const condition = conditionMap[weathercode] || "Clear";

    return {
      temp,
      humidity,
      wind,
      condition,
    };
  } catch (err) {
    console.log("Real weather failed → using fallback simulation", err);
    return null; // fallback later
  }
}

//------------------------------------------------------
// 3) SIMULATED WEATHER (FALLBACK)
//------------------------------------------------------

export const getSimulatedWeather = (city, hour) => {
  const isNight = hour < 6 || hour > 19;
  let temp = city.baseTemp;

  if (isNight) temp -= 5;
  if (hour >= 12 && hour <= 15) temp += 3;

  let condition = "Clear";

  if (city.climate === "rainy" && Math.random() > 0.4) condition = "Rain";
  if (city.climate === "desert" && Math.random() > 0.9) condition = "Cloudy";
  if (city.climate === "cold" && temp < 0) condition = "Snow";
  if (city.climate === "humid" && Math.random() > 0.7) condition = "Cloudy";
  if (city.climate === "variable" && Math.random() > 0.5) condition = "Windy";
  if (city.climate === "windy" && Math.random() > 0.4) condition = "Windy";

  if (condition === "Clear")
    condition = isNight ? "Clear Night" : "Sunny";

  return {
    temp: Math.round(temp),
    condition,
    humidity:
      city.climate === "humid" ? 80 :
      city.climate === "desert" ? 20 : 45,
    wind: city.climate === "windy" ? 25 : 10,
  };
};

//------------------------------------------------------
// 4) COMBINED WEATHER (REAL → FALLBACK)
//------------------------------------------------------

export async function getWeather(city, hour) {
  const real = await getRealWeather(city.lat, city.lon);

  if (real) return real;       // success → return real weather
  return getSimulatedWeather(city, hour); // fallback
}

//------------------------------------------------------
// 5) MAIN FUNCTION USED BY UI
//------------------------------------------------------

export async function fetchWeatherAndTime(cityName) {
  const city = AVAILABLE_CITIES.find(c => c.name === cityName);
  if (!city) throw new Error("City not found!");

  const { timeString, dateString, hour } = getTimeData(city.timezone);
  const phase = getDayPhase(hour);

  const weather = await getWeather(city, hour);

  return { timeString, dateString, phase, weather };
}

//------------------------------------------------------
// 6) SEARCH FUNCTION (unchanged)
//------------------------------------------------------

export const searchAvailableCities = (query, region) => {
  let results = AVAILABLE_CITIES;

  const regionMapping = {
    'Asia': ['Nepal', 'Japan', 'Asia'], 
    'Europe': ['Europe'],
    'America': ['North America'],
    'Middle East': ['Middle East'],
    'Australia': ['Australia']
  };

  if (region !== 'All') {
    const allowedRegions = regionMapping[region] || [];
    results = results.filter(city =>
      allowedRegions.includes(city.region) || city.region === region
    );
  }

  if (query) {
    results = results.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return results;
};
